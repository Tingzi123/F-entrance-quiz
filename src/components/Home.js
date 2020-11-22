import React, {Component} from 'react';
import './Home.scss'

class Home extends Component {
  constructor(){
    super()
    this.state={
      studentsArr:[],
      students:[],
      isAddStudent:true,
      studentName:''
    }
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

  addStudent=(e)=>{
    e.preventDefault(e);
    fetch('http://localhost:8080/students',{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        // body:JSON.stringify({name:this.state.studentName})
        body:this.state.studentName
    })
    .then(res =>res.json())
    .then(data =>{
       console.log(data)
    })
    .catch(err => console.log("error", err))

    this.getAllStudent();

    this.setState({
      isAddStudent:true,
      studentName:''
    })
  }

  addStudentChecked(){
    this.setState({
      isAddStudent:false
    })
  }

  handleFieldChange(e){
    this.setState({
      studentName:e.target.value
    })
  }

  groupStudent(){
    fetch('http://localhost:8080/groups',{
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

  render() {
    return (
      <div className="home">
          <div>
              <div className="group-header">
                <h2 className="list group-list">分组列表</h2>
                <button type="button" onClick={()=>this.groupStudent()}>分组学员</button>
              </div>
              
              <div className="group-dispatch">
                {
                  this.state.studentsArr.map(stus=>(
                    <ul key={stus.id} className="group-index">
                      <p className="group-name">{stus.id}组</p>
                      <div className="group-content">
                        {
                          stus.students.map(stu=>(
                            <li className="group-student" key={stu.id}>{`${stu.id}.${stu.name}`}</li>
                          ))
                        }
                      </div>
                    </ul>
                  ))
                }
              </div>
          </div>

            <div>
              <h2 className="list student-list">学员列表</h2>
              <div>     
                  <ul className="group-index">
                  <div className="group-content group-content-student">
                    {
                        this.state.students.map(stu => (
                            <li className="group-student" key={stu.id}>{`${stu.id}. ${stu.name}`}</li>
                        ))
                    }

                    {/* <li className="group-student group-student-add" onClick={()=>this.addStudent('王昭君')}>+添加学员</li> */}

                    {
                       this.state.isAddStudent?
                        <button type="button" className="group-student group-student-add" onClick={()=>this.addStudentChecked()}>+添加学员</button>
                        :
                        <div>
                          <form onSubmit={this.addStudent}>
                           <input 
                              type="text"
                              value={this.state.studentName}
                              id="name" 
                              onChange={(e)=>this.handleFieldChange(e)} />

                            <input type="submit" 
                                value="Submit" 
                                disabled={!this.state.studentName}
                                className="btn"
                              />
                          </form>
                        </div>
                    }

                  </div>
                    
                  </ul>
              </div>
            </div>       
      </div>
    );
  }
}

export default Home;
