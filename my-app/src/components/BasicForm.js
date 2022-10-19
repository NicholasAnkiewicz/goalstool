import {useFormik} from "formik";
const BasicForm = () => {
    const {
      values,
      handleBlur,
      handleChange,
    } = useFormik({
      initialValues: {
        name_of_goal: "",
        Description: "",
        Deadline: "",
      },
    });
  
    return (
      <form  autoComplete="off">
        <label htmlFor="name_of_goal">Goal Title</label>
        <input
          value={values.name_of_goal}
          onChange={handleChange}
          id="name_of_goal"
          type="name_of_goal"
          placeholder="Enter the title of Goal"
          onBlur={handleBlur}
        />
         <label htmlFor="Description">Description</label>
        <input
          value={values.Description}
          onChange={handleChange}
          id="Description"
          type="Description"
          placeholder="Enter the Description"
          onBlur={handleBlur}
        />
        <label htmlFor="Deadline">Deadline</label>
        <input
          id="Deadline"
          type="date"
          placeholder="Enter the Deadline"
          value={values.Deadline}
          onChange={handleChange}
          onBlur={handleBlur}
        />

    
        <button type="submit">
          Submit
        </button>
      </form>
    );
  };
  export default BasicForm;