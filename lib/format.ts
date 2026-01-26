export const truncateString = (
  address: string,
  prefixLength: number = 8,
  suffixLength: number = 8,
  symbol: string = "..."
): string => {
  if (address.length <= prefixLength + suffixLength + 2) {
    return address; // Return the original address if it's too short to truncate.
  }

  const prefix = address.slice(0, prefixLength + 2); // Include '0x' prefix.
  const suffix = address.slice(-suffixLength);

  return `${prefix}${symbol}${suffix}`;
};
