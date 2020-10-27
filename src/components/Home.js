import React, {Component} from 'react';

class Home extends Component {
  state={
    studentsArr:[],
    students:[]
  }

  componentWillMount(){
    this.groupStudent();
    this.getAllStudent();
  }

  getAllStudent(){
    fetch('http://localhost:8080/students',{
           method:"GET",
           headers:{
               "Accept":"application/json",
               "Content-type":"application/json"
           },
       })
       .then(res =>res.json())
       .then(data =>{
        console.log("data", data)
         this.setState({
            students:data
         })
       })
       .catch(e => console.log("error", e))
  }

  groupStudent(){
    fetch('http://localhost:8080/students/group',{
           method:"GET",
           headers:{
               "Content-type":"application/json"
           },
       })
       .then(res =>res.json())
       .then(data =>{
        console.log("data", data)
         this.setState({
            studentsArr:data
         })
       })
       .catch(e => console.log("error", e))
  }

  addStudent(student){
    fetch('http://localhost:8080/student',{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(student)
    })
    .then(res =>res.json())
    .then(data =>{
       console.log(data)
    })
    .catch(e => console.log("error", e))

    this.getAllStudent();
  }


  render() {
    return (
      <div className="home">
          <div>
              <p>分组列表</p>
              <button onClick={()=>this.groupStudent()}>分组学员</button>
              {/* {this.state.studentsArr.map(index,stus=>(
                  <ul key={index}>
                    <p>第{index}组</p>
                    {stus.map(stu => (
                        <li key={stu.id}>{`${stu.id}. ${stu.name}`}</li>
                    ))}
                  </ul>
              ))} */}
          </div>

            <div>
              <p>学员列表</p>
              <div>     
                  <ul>
                    {this.state.students.map(stu => (
                        <li key={stu.id}>{`${stu.id}. ${stu.name}`}</li>
                    ))}
                    <li><button onClick={()=>this.addStudent('王昭君')}>添加学员</button></li>
                  </ul>
              </div>
            </div>       
      </div>
    );
  }
}

export default Home;
