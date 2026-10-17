// Narrow lines otherwise break compounds such as "10-day" at the hyphen.
export function keepCompounds(text: string) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
