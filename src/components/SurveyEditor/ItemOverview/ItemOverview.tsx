import React from 'react';
import { Survey, isSurveyGroupItem } from 'survey-engine/lib/data_types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface ItemOverviewProps {
    survey: Survey;
    languageCode: string;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
        float: 'right',
        color: theme.palette.text.primary
      },
    paper: {
      padding: theme.spacing(3),
      textAlign: 'left',
      color: theme.palette.text.primary,
      margin: 20
    },
  }),
);

const ItemOverview: React.FC<ItemOverviewProps> = (props) => {
    
    function ClickDown(id:number) {
        console.log(id);
        if (id == props.survey.current.surveyDefinition.items.length-1){
            var cache1 = props.survey.current.surveyDefinition.items[id]
            props.survey.current.surveyDefinition.items.pop()
            props.survey.current.surveyDefinition.items.unshift(cache1)

            var i = 0
            for (i=props.survey.current.surveyDefinition.items.length-1;i>0;i--){
                var temp = document.getElementById(i.toString(10))!.innerHTML;
                document.getElementById(i.toString(10))!.innerHTML = document.getElementById((i-1).toString(10))!.innerHTML;
                document.getElementById((i-1).toString(10))!.innerHTML = temp;
            }
        }
        else{
            [props.survey.current.surveyDefinition.items[id], props.survey.current.surveyDefinition.items[id+1]] = [props.survey.current.surveyDefinition.items[id+1], props.survey.current.surveyDefinition.items[id]];
        
            var temp = document.getElementById(id.toString(10))!.innerHTML;
            document.getElementById(id.toString(10))!.innerHTML = document.getElementById((id+1).toString(10))!.innerHTML;
            document.getElementById((id+1).toString(10))!.innerHTML = temp;
        }

        
    }

    function ClickUp(id:number) {
        console.log(id)
        if (id == 0){
            //swap first and last element
            var cache1 = props.survey.current.surveyDefinition.items[id]
            props.survey.current.surveyDefinition.items.shift()
            props.survey.current.surveyDefinition.items.push(cache1)

            var i = 0
            for (i=0;i<props.survey.current.surveyDefinition.items.length-1;i++){
                var temp = document.getElementById(i.toString(10))!.innerHTML;
                document.getElementById(i.toString(10))!.innerHTML = document.getElementById((i+1).toString(10))!.innerHTML;
                document.getElementById((i+1).toString(10))!.innerHTML = temp;
            }
        }
        else{
            [props.survey.current.surveyDefinition.items[id], props.survey.current.surveyDefinition.items[id-1]] = [props.survey.current.surveyDefinition.items[id-1], props.survey.current.surveyDefinition.items[id]];
        
            var temp = document.getElementById(id.toString(10))!.innerHTML;
            document.getElementById(id.toString(10))!.innerHTML = document.getElementById((id-1).toString(10))!.innerHTML;
            document.getElementById((id-1).toString(10))!.innerHTML = temp;
        }
        
    }
    
    function ClickDownSub(id:number,subid:number){
        console.log(subid)
        const sub = props.survey.current.surveyDefinition.items[id]
        if ("items" in sub){
            if (subid == sub["items"].length-1){
                //swap first and last element
                var cache1 = sub["items"][subid]
                sub["items"].pop()
                sub["items"].unshift(cache1)

                var i = sub["items"].length-1
                for (i=sub["items"].length-1;i>0;i--){
                    var temp1 = document.getElementById(id.toString(10)+"."+i.toString(10))!.innerHTML;
                    document.getElementById(id.toString(10)+"."+i.toString(10))!.innerHTML = document.getElementById(id.toString(10)+"."+(i-1).toString(10))!.innerHTML;
                    document.getElementById(id.toString(10)+"."+(i-1).toString(10))!.innerHTML = temp1;
                }
            }
            else{
                [sub["items"][subid],sub["items"][subid+1]]= [sub["items"][subid+1],sub["items"][subid]]

                var temp = document.getElementById(id.toString(10)+"."+subid.toString(10))!.innerHTML;
                document.getElementById(id.toString(10)+"."+subid.toString(10))!.innerHTML = document.getElementById(id.toString(10)+"."+(subid+1).toString(10))!.innerHTML;
                document.getElementById(id.toString(10)+"."+(subid+1).toString(10))!.innerHTML = temp;
            }
            
        }
        else{
            console.log("Error in changing Sub component")
        }
    }

    function ClickUpSub(id:number,subid:number){
        console.log(subid)
        
        const sub = props.survey.current.surveyDefinition.items[id]
        if ("items" in sub){
            if (subid == 0){
                //swap first and last element
                var cache1 = sub["items"][subid]
                sub["items"].shift()
                sub["items"].push(cache1)

                var i = 0
                for (i=0;i<sub["items"].length-1;i++){
                    var temp1 = document.getElementById(id.toString(10)+"."+i.toString(10))!.innerHTML;
                    document.getElementById(id.toString(10)+"."+i.toString(10))!.innerHTML = document.getElementById(id.toString(10)+"."+(i+1).toString(10))!.innerHTML;
                    document.getElementById(id.toString(10)+"."+(i+1).toString(10))!.innerHTML = temp1;
                }
            }
            else{
                [sub["items"][subid],sub["items"][subid-1]]= [sub["items"][subid-1],sub["items"][subid]]

                var temp = document.getElementById(id.toString(10)+"."+subid.toString(10))!.innerHTML;
                document.getElementById(id.toString(10)+"."+subid.toString(10))!.innerHTML = document.getElementById(id.toString(10)+"."+(subid-1).toString(10))!.innerHTML;
                document.getElementById(id.toString(10)+"."+(subid-1).toString(10))!.innerHTML = temp;
            }
            
        }
        else{
            console.log("Error in changing Sub component")
        }
    }

    function Shuffle(id:number){
        const sub = props.survey.current.surveyDefinition.items[id]
        var description
        if ("items" in sub){
            sub["items"].sort( () => Math.random() - 0.5) ;

            //search for description
            for (i=0;i<sub["items"].length;i++){
                const temp1 = sub["items"][i]
                if("components" in temp1 ){
                    const temp2 = temp1["components"]?.items[0].content
                    if(temp2){
                        var index = temp2.findIndex(x => x.code ===props.languageCode);
                        const temp3 = temp2[index]
                        if("parts" in temp3){
                            description = temp3["parts"][0]["str"]
                            //console.log(description)
                        } 
                    }
                }
                document.getElementById(id.toString(10)+"."+i.toString(10))!.innerHTML = "<p><b>"+ sub["items"][i].key+"</b></p><p>"+description+"</p>";
            } 
            
        }
    }

    function subEntry(id:number){
        var subentries = []
        
        const sub = props.survey.current.surveyDefinition.items[id]
        
        if ("items" in sub){
            var j = 0
            var description
            for (j=0;j<sub["items"].length;j++){
                const idsub = j.toString(10)
                const temp_id = id.toString(10)
                const temp1 = sub["items"][j]
                //search for description
                if("components" in temp1 ){
                    const temp2 = temp1["components"]?.items[0].content
                    if(temp2){
                        var index = temp2.findIndex(x => x.code ===props.languageCode);
                        //console.log(index)
                        const temp3 = temp2[index]
                        if("parts" in temp3){
                            description = temp3["parts"][0]["str"]
                            //console.log(description)
                        } 
                    }
                }
                subentries.push(<Paper  className={classes.paper} elevation={5}>
                    <IconButton  aria-label="up" onClick={() => ClickUpSub(parseInt(temp_id),parseInt(idsub))} className={classes.button} >
                        <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton  aria-label="down" onClick={() => ClickDownSub(parseInt(temp_id),parseInt(idsub))} className={classes.button} >
                        <ArrowDownwardIcon />
                    </IconButton>
                    <div id = {id.toString(10)+"."+j.toString(10)} ><p><b>{sub["items"][j].key}</b></p><p>{description}</p></div>
                    
                    </Paper>)
            }
        }

        return subentries
    }
    
    const classes = useStyles();
   
    var items = props.survey.current.surveyDefinition.items;
    //console.log(props.survey.current.surveyDefinition.selectionMethod)
    var i = 0;
    var entries = []
    for (i=0;i<items.length;i++){
        //console.log(props.survey.current.surveyDefinition.items[i].key);
        var subentries= subEntry(i)
        
        const temp_id = i
        entries.push(<Paper  className={classes.paper} elevation={5}>
            <IconButton  aria-label="up" onClick={() => ClickUp(temp_id)} className={classes.button} >
                <ArrowUpwardIcon />
            </IconButton>
            <IconButton  aria-label="down" onClick={() => ClickDown(temp_id)} className={classes.button} >
                <ArrowDownwardIcon />
            </IconButton>
            <IconButton  aria-label="shuffle" onClick={() => Shuffle(temp_id)} className={classes.button} >
                <ShuffleIcon />
            </IconButton>
            <div id = {i.toString(10)} >
                <p ><b>{props.survey.current.surveyDefinition.items[i].key}</b></p>
                {subentries}
            </div>
            
            </Paper>)
    }
    //console.log("test");
    
    return (
        <div className={classes.root} id = "div">
            
            <Paper className={classes.paper} elevation={5}>
                <IconButton aria-label="sorted"  className={classes.button}   >
                    <FormatListNumberedIcon />
                </IconButton>
                <p><b>{props.survey.current.surveyDefinition.key}</b></p>
                {entries}
            </Paper>
        </div>
    );
};

export default ItemOverview;
