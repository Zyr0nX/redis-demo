export default function CreateStudentForm() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());

        console.log(formData);

        const res = await fetch('/api/students', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await res.json();
        console.log(result);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Họ tên</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Họ tên" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Ngày sinh</label>
                <input type="date" className="form-control" id="birthDate" name="birthDate" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        // <form className="" onSubmit={handleSubmit}>
        //     <input type="text" name="name" placeholder="Name" />
        //     <input type="date" name="birthDate" placeholder="Birthdate" />

        //     <button type="submit">Submi</button>
        // </form>
    )
}