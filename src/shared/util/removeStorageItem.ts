export const removeLocalStorageItem = (
  key: string,
  targetIndex: number,
  toggle: number
) => {
  const items = JSON.parse(localStorage.getItem(key) || "[]");

  const removingItems =
    toggle === 1
      ? items.filter((index: number) => index !== targetIndex)
      : toggle === 3
      ? items
          .filter((index: number) => index !== targetIndex)
          .map((index: number) => (index > targetIndex ? index - 1 : index))
      : items.filter((item: number, index: number) => index !== targetIndex);

  localStorage.setItem(key, JSON.stringify(removingItems));
};
