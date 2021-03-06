
export const ageValidator = (req, res, next) => {
    let age = req.body.age;
    if (age < 18 || age > 100) {
        return res.status(400).json({
            message: 'Edad inválida, debe ser mayor a 18 años'
        });
    }
    next();
}

export const petAgeValidator = (req, res, next) => {
    let age = req.body.age;
    if (age < 0 || age > 100) {
        return res.status(400).json({
            message: 'Edad de mascota no válida'
        });
    }
    next();
}