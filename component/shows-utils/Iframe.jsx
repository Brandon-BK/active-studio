export default function Iframe(props) {
    return (<div style={{ margin:"0 8px" , scale:'1' }} dangerouslySetInnerHTML={ {__html:  props.iframe ? props.iframe:""}} />)
  }