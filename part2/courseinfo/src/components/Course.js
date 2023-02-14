const Header = (props) => {
    return (
     <h1>{props.name}</h1>
    )
  }
  const Part = ({part}) => {
    console.log(part)
    return (
      <p>
       {part.name} {part.exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    console.log("content parts=" + parts.length)
    return (   
      parts.map( part => <Part key={part.id} part={part}/> )
     )
  }
  
  
  
  const Total = ({parts}) => {
    //const total = parts[0].exercises+parts[1].exercises+parts[2].exercises
    console.log("total", parts)
    const total = parts.reduce(
      (sum,part) => {
        return sum + part.exercises
      }, 
      0
    )
    return(
      <p>Number of exercises {total}</p>
    )
  }
  
  const Course = ({course}) => {
   return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course