import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

async function connect() {
    if (!client.connected) {
        await client.open(process.env.REDIS_URL);
    } else {
        console.log('Redis is already connected');
    }
}

class Student extends Entity {}

let schema = new Schema(
    Student, {
        name: { type: 'string'},
        birthDate: { type: 'date'},
    },
    {
        dataStructure: 'JSON',
    }   
);

export async function createStudent(data) {
    await connect();
    
    const repository = client.fetchRepository(schema);

    const student = repository.createEntity(data);

    const id = await repository.save(student)

    return id;
}

export async function getStudent(id) {
    await connect();

    const repository = client.fetchRepository(schema);

    const student = await repository.fetch(id);

    return student;
}

export async function getStudents() {
    await connect();

    const repository = client.fetchRepository(schema);

    const students = await repository.search().return.all();

    return students;
}

export async function updateStudent(id, data) {
    await connect();

    const repository = client.fetchRepository(schema);

    const student = await repository.findOne(id);

    student.set(data);

    await repository.save(student);

    return student;
}

export async function deleteStudent(id) {
    await connect();

    const repository = client.fetchRepository(schema);

    await repository.remove(id);

    await repository.delete(student);
}

export async function deleteStudents() {
    await connect();

    const repository = client.fetchRepository(schema);

    const students = await repository.findAll();

    await repository.remove(students);
}