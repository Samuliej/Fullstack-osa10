// Helper function to format the numbers to the desired format
export const formatNumber = (number) => {
  if (number >= 1000) {
    const formatted = (number / 1000).toFixed(1);
    return `${formatted}k`;
  }
  return number.toString();
};

// Helper function to format the text to multiple lines
// refactored to handle longer descriptions
export const splitText = (text, maxLength) => {
  if (text.length > maxLength) {
    // Find the last space within maxLength
    let lastSpaceIndex = text.lastIndexOf(' ', maxLength);

    // If no space found within maxLength, split at maxLength
    if (lastSpaceIndex === -1) {
      lastSpaceIndex = maxLength;
    }

    const firstHalf = text.slice(0, lastSpaceIndex);
    const secondHalf = text.slice(lastSpaceIndex + 1);

    // If the secondHalf is still longer than maxLength, recursively split it
    if (secondHalf.length > maxLength) {
      return `${firstHalf}\n${splitText(secondHalf, maxLength)}`;
    }

    return `${firstHalf}\n${secondHalf}`;
  }
  return text;
};

export const parseDate = (date) => {
  const parts = date.slice(0, 10).split('-');
  let formattedDate = '';

  for (let i = parts.length-1; i >= 0; i --) {
    if (i === 0) { formattedDate = formattedDate + parts[i];
    } else {
      formattedDate = formattedDate + parts[i] + '.';
    }
  }

  return formattedDate;
};