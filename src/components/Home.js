import React, {Component} from 'react';
// TODO GTB-工程实践: - 针对这个文件里面的所有console，都不应该被提交
// TODO GTB-工程实践: - ESLint各种报错
class Home extends Component {
  state={
    studentsArr:[],
    students:[]
  }
// TODO GTB-知识点: - componentWillMount是被废弃的生命周期，建议不要使用了
  componentWillMount(){
    this.groupStudent();
    this.getAllStudent();
  }

  getAllStudent(){
      // TODO GTB-工程实践: - API请求应该被抽取到一个单独的文件
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
              {/* // TODO GTB-工程实践: - dead code 不应该被提交上来 */}
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
