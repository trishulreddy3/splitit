import cron from "node-cron";
import RecurringExpense from "../models/RecurringExpense";
import Expense from "../models/Expense";

export const startCronJobs = () => {
  // Run every day at midnight
  cron.schedule("0 0 * * *", async () => {
    console.log("Running recurring expense job...");
    const today = new Date();
    
    try {
      const dueExpenses = await RecurringExpense.find({
        active: true,
        nextRun: { $lte: today },
        $or: [{ endDate: { $exists: false } }, { endDate: { $gte: today } }]
      });

      for (const req of dueExpenses) {
        // Create an actual expense
        await Expense.create({
          name: req.name,
          description: req.description,
          amount: req.amount,
          currency: req.currency,
          category: req.category,
          contributors: req.contributors,
          group: req.group,
          participants: req.participants,
          splits: req.splits,
          splitMethod: req.splitMethod,
          expenseDate: new Date()
        });

        // Update next run date based on frequency
        const next = new Date(req.nextRun);
        if (req.frequency === "daily") next.setDate(next.getDate() + 1);
        else if (req.frequency === "weekly") next.setDate(next.getDate() + 7);
        else if (req.frequency === "monthly") next.setMonth(next.getMonth() + 1);
        else if (req.frequency === "yearly") next.setFullYear(next.getFullYear() + 1);

        req.nextRun = next;
        await req.save();
      }
    } catch (error) {
      console.error("Error running recurring expense job", error);
    }
  });
};
