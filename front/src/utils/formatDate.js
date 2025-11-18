export const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return date.toLocaleDateString("es-ES", options);
};
