export function calculateDueDateStatus(dueDate: any, statusIconName: string) {
  if (dueDate == null) {
    return { overdue: null, iconColor: "", done: null, setDate: true };
  }
  const TWO_HOURS_MILISECONDS = 7200000;
  const useDueDate = dueDate?.toDate != null ? dueDate.toDate() : dueDate;

  const presentMiliseconds = new Date().getTime();
  const dueDateMiliseconds = useDueDate.getTime();

  // present is biggen than the due date // than mean we are in the future an the dueDate has passed , so is overdue
  const isIssueOverDue = presentMiliseconds > dueDateMiliseconds; // if > then overdue , if false then dueDate is bigger
  let milisecondsDifference = isIssueOverDue
    ? null
    : dueDateMiliseconds - presentMiliseconds;

  if (statusIconName === "done" && isIssueOverDue) {
    return { overdue: false, iconColor: "blue", done: true };
  }
  if (
    statusIconName === "inProgress" &&
    isIssueOverDue === false &&
    milisecondsDifference != null &&
    milisecondsDifference > TWO_HOURS_MILISECONDS
  ) {
    // lot of time left to complete the issue

    return {
      overdue: false,
      iconColor: "green",
      done: null,
      inProgress: true,
    };
  }
  if (
    statusIconName === "inProgress" &&
    isIssueOverDue === false &&
    milisecondsDifference != null &&
    milisecondsDifference <= TWO_HOURS_MILISECONDS
  ) {
    // two hours left to complete the issue

    return {
      overdue: false,
      iconColor: "yellow",
      done: null,
      inProgress: true,
    };
  }
  if (
    statusIconName !== "canceled" &&
    statusIconName !== "done" &&
    isIssueOverDue
  ) {
    return { overdue: true, iconColor: "red", done: null };
  }
}
