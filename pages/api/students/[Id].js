const redis = require('../../../lib/redis');

export default async function handler(req, res) {
    const id = req.params.Id;

    const method = req.method;

    let result;

    switch (method) {
        case 'GET':
            result = await redis.getStudent(id);
            res.status(200).json(result);
            break;
        case 'POST':
            result = await redis.createStudent(req.body);
            res.status(201).json(result);
            break;
        case 'PUT':
            result = await redis.updateStudent(id, req.body);
            res.status(200).json(result);
            break;
        case 'DELETE':
            result = await redis.deleteStudent(id);
            res.status(200).json(result);
            break;
        default:
            res.status(405).json({ error: 'Method not allowed' });
            break;
    }
}
