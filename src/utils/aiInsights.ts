import { Task, StudyLog } from '../types';

export function generateInsights(
  tasks: Task[],
  studyLogs: StudyLog[],
  streak: number
): string[] {
  const insights: string[] = [];

  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;
  const completionRate = tasks.length > 0 ? completedTasks / tasks.length : 0;
  const highPriorityPending = tasks.filter(
    (t) => !t.completed && t.priority === 'high'
  ).length;

  const last7 = studyLogs.slice(-7);
  const avgHours =
    last7.length > 0
      ? last7.reduce((s, l) => s + l.hours, 0) / 7
      : 0;
  const activeDays = last7.filter((l) => l.hours > 0).length;
  const totalDSA = last7.reduce((s, l) => s + l.dsaQuestions, 0);

  // --- TASK INSIGHT ---
  if (tasks.length === 0) {
    insights.push(
      "No tasks added yet. An empty planner is just another name for procrastination. Add at least 3 tasks you'll commit to finishing today."
    );
  } else if (highPriorityPending > 2) {
    insights.push(
      `${highPriorityPending} high-priority tasks are still pending. Stop managing your to-do list and start clearing it. High priority means do it NOW, not later.`
    );
  } else if (pendingTasks > 6) {
    insights.push(
      `${pendingTasks} pending tasks is a warning sign, not a to-do list. You're over-scheduling and under-executing. Cut the list in half and finish what's left.`
    );
  } else if (completionRate < 0.4 && tasks.length > 3) {
    insights.push(
      `Only ${Math.round(completionRate * 100)}% tasks completed. Low completion isn't a planning problem — it's a follow-through problem. Close the gap between what you plan and what you do.`
    );
  } else if (completionRate >= 0.85) {
    insights.push(
      `${Math.round(completionRate * 100)}% task completion — strong execution. Now make sure you're tackling challenging tasks, not just easy wins to inflate your stats.`
    );
  } else {
    insights.push(
      `Task completion is mediocre at ${Math.round(completionRate * 100)}%. Consistency separates top performers from average ones. Set a daily non-negotiable: finish at least 3 tasks before any screen time.`
    );
  }

  // --- STUDY INSIGHT ---
  if (studyLogs.length === 0 || avgHours === 0) {
    insights.push(
      "Zero study hours logged. Your placement goals don't care about your excuses. Every day without deliberate study is a day your competition moves ahead."
    );
  } else if (activeDays <= 2) {
    insights.push(
      `You studied only ${activeDays} day(s) this week. That's not a study schedule — that's occasional effort. Placement prep demands daily commitment, not weekend cramming.`
    );
  } else if (avgHours < 1.5) {
    insights.push(
      `Averaging ${avgHours.toFixed(1)} hrs/day is dangerously low for placement prep. Aim for a minimum of 3 focused hours daily. Consistency at low hours beats sporadic bursts every time.`
    );
  } else if (totalDSA < 5 && studyLogs.length > 0) {
    insights.push(
      `Only ${totalDSA} DSA questions solved this week. DSA is the gatekeeper for tech placements. If you're not solving daily, you're not preparing — you're pretending.`
    );
  } else {
    insights.push(
      `${avgHours.toFixed(1)} hrs/day average over ${activeDays} active days — solid numbers. Now track quality: are you solving problems independently or reaching for hints every 5 minutes?`
    );
  }

  // --- STREAK / CONSISTENCY INSIGHT ---
  if (streak === 0) {
    insights.push(
      "Streak reset to zero. Discipline isn't motivation — it's a daily decision. Start again today. Not after lunch. Not tomorrow. Right now."
    );
  } else if (streak < 5) {
    insights.push(
      `${streak}-day streak. You're in the most dangerous phase — early enough to quit without guilt. Protect these days fiercely. Get to 7 days minimum before you trust your own habit.`
    );
  } else if (streak < 21) {
    insights.push(
      `${streak}-day streak — you're building something real. Research says habits solidify at 21 days. Don't break the chain for short-term comfort.`
    );
  } else if (streak < 60) {
    insights.push(
      `${streak}-day streak. This is elite territory — most students never make it here. Now the question is: are the hours intentional or just routine? Intentional practice wins placements.`
    );
  } else {
    insights.push(
      `${streak}-day streak. Exceptional. You've proven consistency — now channel it. If you're not getting results, it's time to audit what you're actually doing in those hours.`
    );
  }

  return insights;
}
