import * as React from 'react';
import {useState,useEffect,useMap} from 'react';
import data from './projectsheet.json';
import {Gantt,Task,EventOption,StylingOption,ViewMode,DisplayOption} from 'gantt-task-react-pro';
//import ExpandableTable from './ExpandableTable';
import {Table} from 'react-bootstrap';
import {Stage,Layer,Circle} from 'react-konva';
//import RCGantt from './RCGantt';


function App() {
  const [columns,setColumns] = useState(data.columns);
  const [rows,setRows]= useState(data.rows);
  
  const [parentIds,setParentIds]=useState([0]);

  
  const [open, setOpen] = useState(false);
 
  const [children,setChildren]=useState(new Map());

  const [tasks,setTasks]=useState([{
    start:new Date("2022-12-19T08:00:00"),
    end:new Date("2023-01-14T16:59:59"),
    name:"",
    id:"",
    type:"project",
    progress:0,
    isDisabled:false,
    style:{},

  }])

  /*let tasks = [
    {
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 2),
      name: 'Idea',
      id: 'Task 0',
      type:'task',
      progress: 45,
      isDisabled: true,
      styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    }
  ];   */



  const updateChildren = (parentRow,childrenRows)=>{
    setChildren(children.set(parentRow,childrenRows));
  }

  const getCellClassName=(rowId,nestedParentBoolean)=>{
    let className ='bg-secondary';
    if(findIndex(rowId)!=-1&&!nestedParentBoolean)
     { 
      className='bg-primary'

   }
    else if(findIndex(rowId)!=-1&&nestedParentBoolean=='8777995644080004')
      className ='bg-info';
    else if(findIndex(rowId)!=-1&&nestedParentBoolean!='8777995644080004')
      className ='bg-secondary text-muted';
    return className;
    
  } 

  const appendParentText=(rowId,parentId)=>{
    let className ='';
    if(findIndex(rowId)!=-1&&!parentId)
     { 
      className="#parent"+rowId
    }
    /*else if(findIndex(rowId)!=-1&&parentId=='8777995644080004')
      className ="'collapse' "+"parent"+parentId
    else if(findIndex(rowId)!=-1&&parentId!='8777995644080004')
      className ="'collapse' "+"parent"+parentId*/
    return className;
    
    
  }

  const appendTargetText=(rowId,parentId)=>{
    let className ='';
    if(findIndex(rowId)==-1&&parentId)
     { 
      className="parent"+parentId

   }
    /*else if(findIndex(rowId)!=-1&&parentId=='8777995644080004')
      className ="'collapse' "+"parent"+parentId
    else if(findIndex(rowId)!=-1&&parentId!='8777995644080004')
      className ="'collapse' "+"parent"+parentId*/
    return className;
  }
  
    const findIndex=(temprowId)=>{
      var id=-1;
      for(var i=0;i<parentIds.length;i++)
      {
        if(parentIds[i]==temprowId)
        {
          id=i;
          break;
        }
      }
      return id;
    }

    /*const findMapIndex=(temprowId)=>{
      var id=false;
      if(parentIdsMap.has(temprowId))
            return true;
    }*/

    const groupParents=()=>{
 
    rows&&rows.map((row)=>{ 
      //console.log("Row:"+row.id);
      if(row.parentId){
        let newChild=[];
        let prevChild=[];
        prevChild=children.get(row.parentId);
        if(prevChild!=undefined) {
          newChild=[...prevChild,row]
        }
        else{
          newChild[0]=row;
        }
        updateChildren(row.parentId,newChild);
      }
      
      setTasks(tasks=>([...tasks,{start:new Date(row.cells[4].value),
      end:new Date(row.cells[5].value),
      name:row.cells[1].value,
      id:row.id,
      type:"project",
      progress:row.cells[6].value,
      style:{ progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
    }]));
        console.log("Tasks:",tasks);
    })
   
    };

   
    useEffect(()=>{
      console.log("Entered useEffect");
      groupParents();
   });

return (
  <div className='Responsive'>
    <label>Display react grid</label>
  <Table stripped bordered hover>
  <thead>
    <tr>
         {columns&&columns.map((column,i)=>{return <td className="bg-light text-black" key={i}>{column.title}</td>})} 
    </tr>
  </thead>
  <tbody>
    {rows&&rows.map((row,j)=>{return( <tr key={j}>
      
    { 
   
    row.parentId&&(findIndex(row.parentId)==-1)&&
    setParentIds((arr)=>[...arr,row.parentId])
    }
       {row.cells&&row.cells.map((cell,index)=>{ return(<>
        {(index==0)&&<td className={getCellClassName(row.id,row.parentId)}> <Stage width={15} height={15}>
<Layer><Circle x={10} y={10} radius={100} fill={cell.displayValue}/></Layer></Stage></td>}
       {(index!=0)&&
      <td className={getCellClassName(row.id,row.parentId) } key={cell.columnid}>{(index==1) && findIndex(row.id)!=-1&&<button  onClick={() => setOpen(!open)}
      aria-controls="example-collapse-text"
      aria-expanded={open}>-</button>}{cell.displayValue&&cell.displayValue}</td>}
      </>)})}
    </tr>)})}
  </tbody>
</Table>

<Gantt tasks={tasks}/>
</div>

//<ExpandableTable subRows={children}/>

);
       }

export default App;
