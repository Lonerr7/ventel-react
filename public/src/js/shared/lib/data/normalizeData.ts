import {nanoid} from '@reduxjs/toolkit'

interface HasId {
  id?: string;
}

export const normalizeData = <T extends HasId>(items: Array<T>): Record<string, T> => {
  return items.reduce((acc, curr) => {
    if (curr.id) {
      acc[curr.id] = curr;
    } else {
      acc[nanoid(8)] = curr;
    }

    return acc;
  }, {} as Record<string, T>);
}
