---
title: "Offend the bugs and defend the system"
description: "I want code that recovers from temporary failures and refuses to carry broken assumptions forward. Retries, assertions, guard clauses, and fail-fast all have a place."
date: "2026-09-02"
category: "engineering"
tags: ["engineering", "error-handling", "reliability", "typescript"]
---

Defensive and offensive programming belong in the same system. Their names make that harder to see than it should be.

I can write a script that recovers from a temporary network failure with retries. I can also add assertions to ensure bullshit states don't make it any further. Both decisions protect production.

So why would I have to choose between them?

The useful distinction is what failed, what we know about it, and whether continuing is safe.

## Two questions I want the code to answer

People use these terms a little differently. Here's the distinction I find useful:

| Question | Response | Usually called |
| --- | --- | --- |
| What happens when the outside world misbehaves? | Validate, reject, retry where safe, or use a meaningful fallback. | Defensive programming |
| What happens when a rule our code relies on is broken? | Stop the affected operation and expose the broken assumption. | Offensive programming |

An API timing out is something I expect to happen. A paid order missing the transaction that made it paid is a different kind of problem, **if our system requires that transaction before marking an order paid**.

That condition matters. Free orders, manual payments, and eventually consistent workflows might have different rules. You have to establish the rule before asserting it.

An *invariant* is a condition that must hold at a particular point in the program. Calling it an invariant doesn't make it true. It tells the next engineer what the rest of the code depends on.

When that condition fails, I'd want to know before another operation uses the broken state.

## The same function can do both

Suppose I'm preparing receipt data. The order might not exist, or it might still be unpaid. Both are normal outcomes for this function. Once it's paid, our contract requires a payment ID.

This TypeScript sketch uses two application helpers: `loadOrder` returns a validated order or `null`; `retryTransientRead` retries only recognized temporary read failures, with timeouts, backoff, and a limit of three total attempts.

```ts
import assert from "node:assert/strict";

async function prepareReceipt(orderId: string) {
  const order = await retryTransientRead(
    () => loadOrder(orderId),
    { maxAttempts: 3 },
  );

  // Normal outcomes: there is no receipt to prepare yet.
  if (!order) return null;
  if (order.status !== "paid") return null;

  // Our contract says a paid order has a payment ID.
  assert(
    order.paymentId,
    `Paid order ${order.id} is missing its payment ID`,
  );

  return {
    orderId: order.id,
    paymentId: order.paymentId,
  };
}
```

The retry handles temporary unavailability. The early returns handle ordinary business outcomes. The assertion exposes a violated contract.

Notice where the retry ends: before the assertion. Running the same broken order through the function three times won't create its missing payment record.

I'd also be careful about what gets retried. A timed-out payment request may already have charged the customer. Repeating a write needs a way to prevent duplicate effects, such as a supported idempotency key reused for the same operation. Retry limits, backoff, and jitter keep recovery attempts from overwhelming a struggling dependency. AWS explains these trade-offs in its guidance on [controlling retry calls](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_mitigate_interaction_failure_limit_retries.html).

## Guard clauses describe the shape of the code

A guard clause exits early so the main path stays flat. The condition and the exit behavior tell you what it means.

```ts
// A missing order is a normal result of this lookup.
if (!order) return null;

// Here, our contract says the order must already exist.
if (!order) {
  throw new Error("Expected an order after successful creation");
}
```

These are alternative contracts, not two checks I'd put next to each other in one function.

Both are guard clauses. One handles an expected absence. The other reports a broken assumption. An early return can make the code easier to read, but it doesn't tell you whether returning is the correct thing to do.

That's a separate decision.

## Assertions make a claim. Fail-fast decides when to stop.

An assertion says: this condition must be true here. Node's `assert` throws an `AssertionError` when its condition is falsy. That's runtime behavior, and a surrounding error handler can catch it. It doesn't automatically mean shutting down the whole service. See the [Node.js assertion documentation](https://nodejs.org/api/assert.html#assertokvalue-message).

Fail-fast is broader: detect a problem at the earliest point where you have enough information to identify it, and stop the affected operation.

Rejecting an invalid quantity at an HTTP boundary is defensive and fail-fast. Asserting that an internal calculation obeys its contract can be offensive and fail-fast.

The keyword doesn't decide the philosophy. Throwing a validation error for bad user input is still ordinary input handling. And a TypeScript type alone doesn't validate a value arriving over the network.

I want validation where data enters the system, types that express what we've established, and meaningful runtime checks where breaking a contract would matter.

## A fallback is a decision about the product

Consider this:

```ts
return customer?.name ?? "";
```

That might be completely reasonable. Perhaps the screen supports anonymous customers and an empty name has a defined meaning.

But if this operation requires a customer, what have we just done?

We've turned a missing customer into a blank label. The operation can keep going while the reason it went wrong gets harder to find. Someone may discover it later through a support ticket or an incorrect invoice.

Before accepting a fallback, I'd ask: **is this a valid result, and what will the next piece of code believe when it receives it?**

If the answer is that we're hiding a broken assumption, I want the failure exposed.

## Stopping safely takes more than an assertion

An assertion can protect the rest of the system by stopping the current operation before it spreads invalid state. That is the production benefit of being offensive about an invariant.

It still needs somewhere sensible to land. A request handler can record the failure and return an error. A worker can mark the job failed and surface it for investigation. The report needs enough context to locate the problem without dumping sensitive customer data into logs.

Throwing doesn't undo a database write or reverse a payment. Put checks before side effects where possible, and use transactions or explicit recovery for work that can partially complete. A check can also become stale before a concurrent write, so some rules need enforcement in the database itself.

A supervisor restarting a failed worker can restore service, but restarting won't repair corrupt data or fix a deterministic bug. The same job may fail again. Recovery needs limits and a path for investigation.

The question I care about in review is: **what happens after this check fails?**

For a temporary outage, I'd expect a bounded recovery attempt. For invalid input, a clear rejection. For a broken invariant, stop the affected work, report it, and fix the cause.

Be defensive about the world. Be offensive about your own assumptions. I want both in the code I ship.
