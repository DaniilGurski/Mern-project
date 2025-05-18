export const getLogout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(204).send();
}