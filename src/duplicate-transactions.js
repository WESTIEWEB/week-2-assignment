function findDuplicateTransactions(transactions) {
  if (transactions.length === 1) return [];
  if (!Array.isArray(transactions)) throw error("Error");
  if (!transactions.length) return transactions
  const map = new Map();
  const sortedTransactions = sortTrans([...transactions]);
  sortedTransactions.forEach(transaction => {
    const {
      sourceAccount,
      targetAccount,
      amount,
      category,
      time,
    } = transaction;

    const key = `${sourceAccount}-${targetAccount}-${amount}-${category}-${time.slice(0, 15)}`;
    if (map.has(key)) {
      const group = map.get(key);
      const lastGroupI = group.length - 1;
      const lastGroupMember = group[lastGroupI];
      const timeDiff = gettimeDiff(
        lastGroupMember.time,
        time
      );
      if (timeDiff < 1) {
        group.push(transaction);
      }
    } else {
      map.set(key, [transaction]);
    }
  });
  const duplicates = filterGroups(Array.from(map.values())); // iterable of array of transactions
 // Array.from converts it to an Array of array of transactions
  return duplicates;
  }   


 function gettimeDiff(time1, time2) {
  const ms = getms(time2) - getms(time1);
  const minutes = ms / (1000 * 60); // return time difference in minutes
  return minutes;
 }
 function sortTrans(transactions) {
  return transactions.sort((a, b) => getms(a.time) - getms(b.time));
 }
 function filterGroups(groups) {
  return groups.filter(g => g.length > 1);
 }
 function getms(timeStamp) {
  return new Date(timeStamp).getTime();
 }
// console.log(findDuplicateTransactions(transactions))
export default findDuplicateTransactions;