module.exports = (newObj, toUpdateObj) => {
    Object.keys(newObj)
        .forEach(key => toUpdateObj[key] = newObj[key])
}