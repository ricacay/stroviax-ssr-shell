/**
 * Submits an XRP tip using a connected Xumm wallet instance.
 *
 * @param {Object} params
 * @param {Object} params.xumm - An initialized instance of the XummPkce SDK.
 * @param {string} params.destination - The XRPL address to send funds to.
 * @param {number} params.amount - Amount in XRP (will be converted to drops).
 * @param {boolean} [params.testMode=false] - If true, simulates a successful tip without sending.
 * @param {string} [params.memo] - Optional memo to include in the transaction.
 * @returns {Promise<Object>} Result of the tip attempt.
 */
export const submitXrpTip = async ({ xumm, destination, amount, testMode = false, memo }) => {
  if (!xumm || typeof xumm?.authorize !== "function") {
    return { success: false, error: "Invalid or uninitialized Xumm instance." };
  }

  if (testMode) {
    console.log("[TEST MODE] Simulated tip:", { destination, amount, memo });
    return {
      success: true,
      simulated: true,
      destination,
      amount,
      memo
    };
  }

  try {
    // Ensure user is authorized
    const isAuthorized = await xumm.isAuthorized();
    if (!isAuthorized) {
      await xumm.authorize();
    }

    // Convert to drops
    const drops = Math.floor(amount * 1_000_000);

    const payload = {
      TransactionType: "Payment",
      Destination: destination,
      Amount: drops.toString(),
    };

    if (memo) {
      payload.Memos = [
        {
          Memo: {
            MemoData: Buffer.from(memo, "utf8").toString("hex"),
          },
        },
      ];
    }

    const { created, resolved } = await xumm.payload?.createAndSubscribe(payload, event => {
      if (event.data.signed === false) {
        return { signed: false };
      }
    });

    return {
      success: true,
      signed: resolved.data?.signed,
      payload: created,
    };

  } catch (error) {
    console.error("Error submitting XRP tip:", error);
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
};
