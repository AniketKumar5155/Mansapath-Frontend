const buildFullName = (first_name, middle_name, last_name) => {
    return [first_name, middle_name, last_name]
        .filter(Boolean)
        .join(" ");
};

export default buildFullName;