const truncate = (val, limit = 25) => {
    return (val.length > limit)? (val.substring(0, limit) + '...'): (val);
}

module.exports = truncate