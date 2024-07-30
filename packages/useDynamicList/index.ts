import { useCallback, useRef, useState } from 'react';

const useDynamicList = <T>(initialList: T[] = []) => {
    const counterRef = useRef(-1);

    const keyList = useRef<number[]>([]);
    const setKey = useCallback((index: number) => {
        counterRef.current += 1;
        keyList.current.splice(index, 0, counterRef.current);
    }, []);

    const getKey = useCallback((index: number) => keyList.current[index], []);

    const getIndex = useCallback(
        (key: number) => keyList.current.findIndex((ele) => ele === key),
        [],
      );
    const [list, setList] = useState(() => {
        initialList.forEach((_, index) => {
          setKey(index);
        });
        return initialList;
    });

    const insert = useCallback((index: number, item: T) => {
        setList((l) => {
            setKey(index);
            let temp = l.slice(0, index).concat(item, l.slice(index))
            return temp;
        })
    }, [])

    const merge = useCallback((index: number, items: T[]) => {
        setList((l) => {
            items.forEach((_, index) => {
                setKey(index);
            });
            const temp = l.slice(0, index).concat(items, l.slice(index))
            return temp;
        })
    }, [])

    const replace = useCallback((index: number, item: T) => {
        setList((l) => {
            const temp = [...l];
            temp[index] = item;
            return temp;
        })
    }, [])

    const remove = useCallback((index: number) => {
        setList((l) => {
            const temp = l.slice(0, index).concat(l.slice(index + 1))
            // remove keys if necessary
            try {
                keyList.current.splice(index, 1);
            } catch (e) {
                console.error(e);
            }
            return temp;
        })
    }, [])

    const batchRemove = useCallback((indexes: number[]) => {
        if (!Array.isArray(indexes)) {
            console.error(
                `\`indexes\` parameter of \`batchRemove\` function expected to be an array, but got "${typeof indexes}".`,
            );
            // if (isDev) {
            //   console.error(
            //     `\`indexes\` parameter of \`batchRemove\` function expected to be an array, but got "${typeof indexes}".`,
            //   );
            // }
            return;
          }
          if (!indexes.length) {
            return;
          }
        setList((l) => {
            const newKeyList: number[] = [];
            const temp = l.filter((_, index) => {
                const shouldKeep = !indexes.includes(index)

                if (shouldKeep) {
                    newKeyList.push(getKey(index));
                }
                return shouldKeep;
            })
            keyList.current = newKeyList;
            return temp;
        })
    }, [])

    const move = useCallback((oldIndex: number, newIndex: number) => {
        if (oldIndex === newIndex) {
            return;
        }

        setList((l) => {
            const newList = [...l];
            [newList[oldIndex], newList[newIndex]] = [newList[newIndex], newList[oldIndex]];

            // move keys if necessary
            try {
                const keyTemp = keyList.current.filter((_, index: number) => index !== oldIndex);
                keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
                keyList.current = keyTemp;
            } catch (e) {
                console.error(e);
            }
            return newList;
        })
    }, [])

    const push = useCallback((item: T) => {
        setList((l) => {
          setKey(l.length);
          return l.concat([item]);
        });
    }, []);

    const pop = useCallback(() => {
        // remove keys if necessary
        try {
          keyList.current = keyList.current.slice(0, keyList.current.length - 1);
        } catch (e) {
          console.error(e);
        }
    
        setList((l) => l.slice(0, l.length - 1));
    }, []);

    const unshift = useCallback((item: T) => {
        setList((l) => {
          setKey(0);
          return [item].concat(l);
        });
    }, []);
    
    const shift = useCallback(() => {
        // remove keys if necessary
        try {
          keyList.current = keyList.current.slice(1, keyList.current.length);
        } catch (e) {
          console.error(e);
        }
        setList((l) => l.slice(1, l.length));
    }, []);
    
    const sortList = useCallback(
        (result: T[]) =>
          result
            .map((item, index) => ({ key: index, item })) // add index into obj
            .sort((a, b) => getIndex(a.key) - getIndex(b.key)) // sort based on the index of table
            .filter((item) => !!item.item) // remove undefined(s)
            .map((item) => item.item), // retrive the data
        [],
    );

    const resetList = useCallback((newList: T[]) => {
        keyList.current = [];
        setList(() => {
          newList.forEach((_, index) => {
            setKey(index);
          });
          return newList;
        });
    }, []);
    return {
        list,
        insert,
        merge,
        replace,
        remove,
        batchRemove,
        getKey,
        getIndex,
        move,
        push,
        pop,
        unshift,
        shift,
        sortList,
        resetList,
    }
}

export default useDynamicList;