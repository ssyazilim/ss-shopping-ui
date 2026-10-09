const TR_TO_EN: Record<string, string> = {
  Ç: "C",
  ç: "c",
  Ğ: "G",
  ğ: "g",
  İ: "I",
  ı: "i",
  Ö: "O",
  ö: "o",
  Ş: "S",
  ş: "s",
  Ü: "U",
  ü: "u",
}
const convertTRtoEN = (letter: string) =>
  letter.replace(/[ÇçĞğİıÖöŞşÜü]/g, (newLetter) => TR_TO_EN[newLetter] ?? newLetter)

export const convertUppercase = (letter: string) =>
  convertTRtoEN(letter)
    .replace(/[^A-Za-z0-9 .,:#?&/=%~@+_-]/g, "")
    .toUpperCase()
export const convertCardNumber = (letter: string) => {
  const v = letter.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
  const matches = v.match(/\d{4,16}/g)
  const match = (matches && matches[0]) || ""
  const parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }
  if (parts.length) return parts.join(" ")

  return v
}
export const checkTextLength = (text: string, cut: number = 50) => {
  if (text?.length > cut) return text.slice(0, cut) + "..."
  return text
}
export const truncateUrl = (url: string, visibleChars: number = 40, separator: string = "..."): string => {
  if (!url || url.length <= visibleChars) return url

  const charsToShow = visibleChars - separator.length
  const start = Math.floor(charsToShow / 2)
  const end = url.length - Math.ceil(charsToShow / 2)

  return url.substring(0, start) + separator + url.substring(end)
}
export const encodeShortName = (name: string, surname: string = ""): string => {
  const namePart = (name || "").trim().split(/\s+/).filter(Boolean).join("-")
  const surnamePart = (surname || "").trim().split(/\s+/).filter(Boolean).join("-")
  return surnamePart ? `${namePart}_${surnamePart}` : namePart
}
