import Academic from "../models/Academic.js";

export const getAcademicHierarchy = async (req, res)=>{
    try {
        const academics = await Academic.find({})
        res.status(200).json(academics)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createAcademicSubject = async(req,res)=>{
    try {
        const {grade,stream, subject, units} = req.body
        const existing = await Academic.findOne({grade,subject})
        if(existing){
            return res.status(400).json({message: 'Subject already exists for this grade'})
        }

        const newAcademic = await Academic.create({
            grade,
            stream,
            subject,
            units: units || []
        })

        res.status(201).json(newAcademic)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const seedAcademicData = async (req,res) => {
    try {
        const count = await Academic.countDocuments()
        if (count>0){
            return res.status(200).json({message: 'Database already has academic data', count})
        }

        const sampleData = [
            {
                grade: 'A/L',
                stream: 'Physical Science',
                subject: 'Combined Mathematics',
                units: [
                    {
                        unitNumber: 1,
                        title: 'Pure Mathematics',
                        topics: [
                            {name: 'Quadratic Functions and Roots', description: 'Real roots, discriminant and graphs'},
                            {name: 'Matrics and Determinants', description: 'Matrix operations and inverse'},
                            {name: 'Differentiation', description: 'Chain rule, product rule, and curve sketching'},
                            {name: 'Integration', description: 'Definite integrals and area under curves'}
                        ]
                    },
                    {
                        unitNumber: 2,
                        title: 'Applied Mathematics',
                        topics: [
                            {name: 'Coplanar Forces', description: 'Equlibrum of rigid bodies'},
                            {name: 'Newtonian Dynamics', description: 'Motion in straight line and projectiles'},
                            {name: 'Relative velocity', description: 'Relative velocity vectors'}
                        ]
                    }
                ]
            },
            {
                grade: 'A/L',
                stream: 'Physical Science',
                subject: 'Physics',
                units: [
                    {
                        unitNumber: 1,
                        title: 'Measurement & Mechanics',
                        topics: [
                            {name: 'Units and Dimensions', description: 'Dimensional analysis and error propagation'},
                            {name: 'Circular Motion', description: 'Centripetal force and banking'}
                        ]
                    },
                    {
                        unitNumber: 2,
                        title: 'Waves and Oscillations',
                        topics: [
                            {name: 'Simple Harmonic Motion', description: 'Pedulums and spring oscillators'},
                            {name: 'Doppler Effect', description: 'Sound frequency shift'}
                        ]
                    }
                ]
            }
        ]

        await Academic.insertMany(sampleData)
        res.status(201).json({message: 'Academic data seeded successfully!',count: sampleData.length})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateAcademicSubject = async (req,res) => {
    try{
        const {grade, stream, subject,units} = req.body;

        const academic= await Academic.findById(req.params.id)
        if (!academic) {
            return res.status(404).json({message: 'Subject hierarchy not found'})
        }

        academic.grade = grade || academic.grade;
        academic.stream = stream || academic.stream;
        academic.subject = subject || academic.subject
        if (units) {
            academic.units = units
        }

        const update = await academic.save()
        res.status(200).json(update)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const deleteAcademicSubject = async (req,res) =>{
    try {
        const academic = await Academic.findById(req.params.id)
        if(!academic){
            return res.status(404).json({message: 'Subject hierarchy not found'})
        }

        await academic.deleteOne()
        res.status(200).json({message: 'Subject hierarchy removed successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}