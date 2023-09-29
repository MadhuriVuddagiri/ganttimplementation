import {Gantt,Task,EventOption,StylingOption,ViewMode,DisplayOption} from 'gantt-tast-react-pro';
import data from './projectsheet.json';

function RCGantt(){
    return (
        <div style={{width:'100%',height:500}}>
            <RcGantt
            data={data}
            columns={[
                {
                    tasks:'tasks',
                    label:'label',
                    width:200,
                    maxWidth:200,
                    minWidth:200,
                }
            ]}
            onUpdate={async ()=>{
                return true
            }}
            />
        </div>
    )
}

export default RCGantt;