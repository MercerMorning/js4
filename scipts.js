let array = [1, 2, 3, 4, 3, 6];

function foreach(array, callbackFn)
{
    let count = 0;
    while (count !== array.length - 1) {
        count++;
        callbackFn(array[count]);
    }
}

function filt(array, conditionFn)
{
    let count = 0;
    let pass = 0;
    let result = [];
    while (count !== array.length) {
        if (conditionFn(array[count])) {
            result[pass] = array[count];
            pass++;
        }
        count++;
    }
    return result;
}

function selfMap(array, callbackFn)
{
    let count = 0;
    let result = [];
    while (count !== array.length - 1) {
        result[count] = callbackFn(array[count]);
        count++;
    }
    return result;
}

function mySlice(array, begin, end)
{
    if (begin > array.length || end > array.length) {
        throw new Error('в массиве нету столько элементов')
    }
    let count = begin;
    let last = end;
    let result = [];
    let resCount = 0;
    if (begin < 0) {
        count = (array.length - 1) + begin;
    }
    if (end < 0) {
        last = (array.length) + end;
    }
    try {
        while (count !== last) {
            result[resCount] = array[count];
            count++;
            resCount++;
        }
    } catch (e) {
        console.error(e.message)
    }
    return result;
}

function myReduce(array, callbackFn)
{
    let count = 0;
    let previous = 0;
    let current;
    let result = [];
    while (count !== array.length) {
        if (count !== 0) {
            previous = array[count - 1]
        }
        current = array[count];
        result[count] = callbackFn(array[count], current, previous);
        count++;
    }
    return result;
}

// function mySplice(array, begin, end, replace = null) {
//     if (begin > array.length || end > array.length) {
//         throw new Error('в массиве нету столько элементов')
//     }
//     let deleted = [];
//     let count = begin;
//     let last = end;
//     let result = [];
//     let resCount = 0;
//     let delCount = 0;
//     if (begin < 0) {
//         count = (array.length - 1) + begin;
//     }
//     if (end < 0) {
//         last = (array.length) + end;
//     }
//     try {
//         while (delCount !== begin) {
//             result[resCount] = array[count];
//             count++;
//             delCount++;
//         }
//         while (count !== last) {
//             result[resCount] = array[count];
//             count++;
//             resCount++;
//         }
//     } catch (e) {
//         console.error(e.message)
//     }
//     return result;
// }

foreach(array, item => console.log(item))
console.log(filt(array, item => item > 3))
console.log(selfMap(array, item => item * 2))
console.log(mySlice(array, -2, -1))
console.log(myReduce(array, function  (item, current, previous) { return current + previous }))

/* СРАВНИВАЕМ ОБЪЕКТЫ */
var objA = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
        subProp1: 'sub value1',
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        }
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10)
};

var objB = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
        subProp2: {
            subSubProp1: 'sub sub value1',
            subSubProp2: [1, 2, {prop2: 1, prop: 2}, 4, 5]
        },
        subProp1: 'sub value1'
    }
};


function deepEqual(obj1, obj2)
{
    if (Object.keys(obj1).length === Object.keys(obj2).length) {
        for (let prop in obj1) {
            if (obj2.hasOwnProperty(prop)) {
                if (typeof obj1[prop] === "object") {
                    deepEqual(obj1[prop], obj2[prop])
                }
                else if (obj1[prop] === obj2[prop]) {
                    continue;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

console.log(deepEqual(objA, objB))