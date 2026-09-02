---
title: "Offend the bugs and defend the system"
description: "A script can recover from a network failure and refuse to continue with a broken order. I want both in the code I ship."
date: "2026-09-02"
category: "engineering"
tags: ["engineering", "error-handling", "reliability", "typescript"]
---

Defensive and offensive programming belong in the same system. Their names make that harder to see than it should be.

I can write a script that recovers from a temporary network failure with retries. I can also add assertions to ensure bullshit states don't make it any further. Both decisions protect production. So why would I have to choose between them?

Imagine we're writing a small script that prepares receipts. It looks up an order, checks whether it's paid, and returns the information we'll need for the receipt.

The first time it tries to read an order, the connection times out. The script hasn't received an answer within the time we allowed. Networks do that. I'd have it wait briefly and try the read again, with a limit so it eventually gives up if the problem continues. That's a retry, and it's one way to write defensively: we've anticipated a failure and decided how to handle it.

The second attempt succeeds. We have an order, but the customer hasn't paid yet. That's fine too. There's no receipt to prepare, so the function returns `null`, meaning there's nothing to return for this order. Nobody needs to be woken up because a customer hasn't finished checking out.

Now imagine the next order is marked as paid, but its payment ID is missing. That ID is the reference connecting the order to its payment record.

In this system, an order is only marked paid after that reference has been saved. We don't support free orders or manual payments here. Given those rules, this order should never have reached this state.

This is where I'd stop. I wouldn't want another part of the system preparing a receipt on the assumption that the payment information is complete.

The rule we've broken has a name: an **invariant**. It means a condition that must hold at a particular point in the program. Ours is simple: once an order is paid, it must have a payment ID. If your checkout allows payment details to arrive later, you'd need a different rule.

An **assertion** turns that assumption into a check the program actually runs. In this case, it checks that the payment ID exists and throws an error if it doesn't. People generally call this offensive programming: we've made a broken assumption fail visibly, close to where we found it.

Here's how those decisions fit in one function. The two helper functions stand in for application code: `loadOrder` reads and validates the order data, while `retryTransientRead` handles temporary read failures with a timeout for each attempt, a delay between attempts, and a limit of three total attempts.

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

Those two early returns are **guard clauses**. They deal with a condition at the top of the function and leave early, so the rest of the work doesn't need to sit inside several layers of `if` statements. A guard clause can also throw an error. Whether we return or throw depends on what the condition means in that function.

The assertion also demonstrates **fail-fast**: stop as soon as we have enough information to know something is wrong. The payment ID is missing, and we know it is required here. There's no reason to pass that problem further along.

Fail-fast also applies when someone sends us an invalid request. If a customer asks to buy minus three items, we can reject that input immediately and explain the problem. Bad input is something we expect from the outside world, so that check is defensive too. These terms overlap because they're describing different decisions.

What bothers me is how easily we can make the broken order look harmless. Replace the assertion with a fallback like `order.paymentId ?? ""`, and a missing payment ID becomes an empty string. The function returns receipt data. Anything using that result now has to discover the problem again, assuming it checks at all.

A fallback needs a meaning the product can support. An empty display name might be fine for an anonymous visitor. In our receipt script, an empty payment reference hides information we need. I'd rather the error point straight to the order that broke the rule than have someone chase it through a customer complaint later.

Of course, stopping the function is only part of the job. Node's [`assert` throws an error](https://nodejs.org/api/assert.html#assertokvalue-message); it doesn't automatically shut down the entire service. The code running this script should record which order failed and report it for investigation. It can continue processing other orders if those jobs are independent and no shared state was damaged.

And notice that our retry only wraps the read. Retrying the same broken order won't create its missing payment record. Restarting the script won't fix that bug either. We need to find out how the order got into that state.

There's another detail I'd care about before shipping this: retrying a payment is riskier than retrying a read. A payment request can time out after the customer has already been charged. Repeating it needs protection against charging twice. A payment provider's idempotency key can do that: reuse the same key for the same payment attempt so the provider recognizes a repeated request. AWS explains the details in [making retries safe](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/).

An assertion won't reverse a charge or undo a database write that already happened. I'd put the check before that work wherever possible. When several database changes must succeed together, a **transaction** lets us save all of them or undo them together.

If two requests can change the same record at once, the database may need to enforce the rule as well. Checking a value once doesn't guarantee it stays true while we're working.

That's why I care about what happens around the check as much as the check itself. Does the script recover from a temporary failure? Does it stop before using a broken order? Will we know which order failed and have enough information to fix it?

The retry and the assertion are both there because I care about the system continuing to work correctly.

Be defensive about the world. Be offensive about your own assumptions. I want both in the code I ship.
