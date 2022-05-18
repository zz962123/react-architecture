import React, { Component } from 'react';
import { Grid, Typography, Box, Paper, Divider, Card, TextField, Breadcrumbs, Switch, FormControl, FormControlLabel, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Communicator from 'Communicator/Comunicator';
import WeatherIconComponent from '../Util/Weather/WeatherIconComponent';

let Intervaldata,endyn="N";
class DeviceDashboard extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            monitoringList:[],
            monitoringNodeList:[], 
            checked:true,
            // wdeviceViewList:[],//물놀이장 리스트
            // areaViewList:[],//구역 리스트
            // deviceViewList:[],
            selectedData:{
                devicename:'',
                state:'',
                runtime:'',
                devicestate:'',
                elec:'',
                starttime:'',
                resolve:''
            },
            selectedSpace : {
                spaceId :'',
                spaceName:'',
                nodeName:'',
                airQuality:'',
                temperature:'',
                weather:''
            },
            weather:'좋음',
            temperature:'14℃',
            dust:'매우나쁨',
            zninfo : {
                poolname:'',
                state:'',
                turbidity:'',
                ph:'',
                do:''
            },
            open: false
        }
        endyn="N"
        this.connector = new Communicator();
    }
    
    componentDidMount (){
        this._ismounted = true;
        if(endyn=="Y"){
            clearInterval(Intervaldata)
            return
        }

        this.getSpaceList();
        setTimeout(()=>{
            this.onReload(this.state.checked);
        },300000)
        
    }

    componentWillUnmount (){
        this._ismounted = false;
        endyn='Y';
        clearInterval(Intervaldata);//이거 안해주면 뒤에서 계속 돌수있으니 꼭 해야해함
    }

    /* 물놀이장 리스트 가져오기 */
    getSpaceList = async () => {
        const userId = "765782f1-2502-4638-b667-9be7b09fbb98"
        const responseMonitoring = await this.connector.client.get(`/api/v1/real-time-monitoring/space-node?userId=${userId}`);

        this.setState({
            monitoringList : responseMonitoring.data.data
        });
        if(this.state.selectedSpace.spaceId==''){
            this.selectFirstColumnOnSpaceGrid();
        }else{
            this.selectedColumnOnSpacenGrid();
        }
        
    }
    
    onSpaceGridReady = async (params) => {
        this.wGrid = params.api;
        this.wGridColumn = params.columnApi;
        
        this.selectFirstColumnOnSpaceGrid()
    }
    onaAreaGridReady = async (params) => {
        this.areaGrid = params.api;
        this.areaGridColumn = params.columnApi;

        this.selectFirstColumnOnAreaGrid()
    }

    selectFirstColumnOnSpaceGrid() {
        this.wGrid.forEachNode(function (node) {
            if (node.rowIndex === 0) {
                node.setSelected(true);
            }
        });
    }
    selectedColumnOnSpacenGrid = () => {
        const selectSpaceId = this.state.selectedSpace.spaceId;
        this.wGrid.forEachNode(function (node) {
            if (node.data.spaceId === selectSpaceId) {
                node.setSelected(true);
            }
        });
    }
    selectFirstColumnOnAreaGrid() {
        this.areaGrid.forEachNode(function (node) {
            if (node.rowIndex === 0) {
                node.setSelected(true);
            }
        }); 
    }

    selectedSpaceChanged = (grid)=>{
        let selectedRows = grid.api.getSelectedRows()[0];
        if(selectedRows.spaceNodeStatusList.length !== 0 ){
            this.setState({
                selectedSpace : {
                    spaceId :selectedRows.spaceNodeStatusList[0].spaceId,
                    spaceName : selectedRows.spaceNodeStatusList[0].spaceName,
                    nodeName : selectedRows.spaceNodeStatusList[0].nodeName,
                    airQuality: selectedRows.spaceNodeStatusList[0].airQuality,
                    temperature: selectedRows.spaceNodeStatusList[0].temperature,
                    weather: selectedRows.spaceNodeStatusList[0].weather
                }
            })
                
        }else{
            this.setState({
                selectedSpace : {
                    spaceId :'',
                    spaceName : '',
                    nodeName : '',
                    airQuality: '',
                    temperature: '',
                    weather: ''
                }
            })
        }
        this.getAreaList(selectedRows.spaceId);
        
    }

    selectedNodeChanged = (grid)=>{
        let selectedRows = grid.api.getSelectedRows()[0];
        this.setState({
            selectedSpace : {
                spaceId : selectedRows.spaceId,
                spaceName : selectedRows.spaceName,
                nodeName : selectedRows.nodeName,
                airQuality: selectedRows.airQuality,
                temperature: selectedRows.temperature,
                weather: selectedRows.weather
            }
        })
        this.getAreaList(selectedRows.spaceId);
    }

    /*구역데이터가져오기*/
    getAreaList=(spaceId)=>{
        if(this.state.monitoringList.length !== 0 && spaceId !== undefined){
            let monitoringSpaceId = spaceId;
            let monitoringNodeList = this.state.monitoringList.filter( (item) => item.spaceId === monitoringSpaceId )[0].spaceNodeStatusList
            // /debugger;
            let nodeList = [];
            monitoringNodeList.map((item)=> {
                nodeList.push({
                    airQuality: item.airQuality,
                    spaceName: item.spaceName,
                    nodeName: item.nodeName,
                    operatingStatus: item.operatingStatus,
                    doProbe: item.doProbe=="offline"?'오프라인':item.doProbe,
                    ecProbe: item.ecProbe=="offline"?'오프라인':item.ecProbe,
                    error: item.error=="offline"?'오프라인':item.error,
                    operatingTime: item.operatingTime=="offline"?'오프라인':item.operatingTime,
                    phProbe: item.phProbe=="offline"?'오프라인':item.phProbe,
                    powerConsumption: item.powerConsumption=="offline"?'오프라인':item.powerConsumption,
                    temperature: item.temperature=="offline"?'오프라인':item.temperature,
                    turbidityProbe:item.turbidityProbe=="offline"?'오프라인':item.turbidityProbe,
                    weather: item.weather=="offline"?'오프라인':item.weather
                })
            })
            this.setState({
                monitoringNodeList:nodeList
            })
    
            this.selectFirstColumnOnAreaGrid();
        }
    }
    handleSwitchChange = async(e)=>{
        this.setState(thisState => ({
            checked: e.target.checked
        }));
        if(e.target.checked){
            this.onReload(e.target.checked);
        }else{
            clearInterval(Intervaldata);
        }
    }
    onReload  = async(chk)=>{
        let self = this;
        if(chk){
            this.getSpaceList();
            clearInterval(Intervaldata);
            Intervaldata= setInterval(function(){
                
                self.onReload(true)
               // console.log(new Date())
           // },3000)//초
            },300000)//5분
        }else{
            clearInterval(Intervaldata);
        }
    }

    //에러일때 팝업띄우기
    cellButtonClick=(param)=>{
        let value = param.value 
        if(value=='정상') return;

        this.setState((thisState)=>{
            let  state = {...thisState};
            state.selectedData.devicename = param.data.devicename
            state.selectedData.state = param.data.state
            state.selectedData.runtime = param.data.runtime
            state.selectedData.devicestate = param.data.devicestate
            state.selectedData.elec = param.data.elec
            state.selectedData.starttime = param.data.starttime
            //state.selectedData.resolve = param.data.devicename
            return state;
        })
        this.handleDialogOpen();
        
    }

    /* 다이얼로그가 열릴 때 */
    handleDialogOpen = () => {
        this.setState({
            open: true
        })
    }
    /* 다이얼로그가 닫힐 때 */
    handleDialogClose = () => {
        this.setState({
            open: false
        });
    }
    /*조치 저장하기 */
    onSaveButtonClick = async () => {
        //console.log('조치 저장후에 재조회')
        //조치 저장후에 재조회
        this.handleDialogClose();//닫기
    }

    operatingStatusFormatter = (param) => {
       // console.log("Formatter", param.value);
        switch(param.value) {
            case "SELF": return "독립";
            case "SYSTEM": return "시스템";
            case "offline": return "오프라인";
            default: return "...";
        }
    }

    airQualityFormatter = (param) => {
        switch(param) {
            case "1": return "좋음"
            case "2": return "정상"
            case "3": return "보통"
            case "4": return "나쁨"
            case "5": return "심각"
            case "offline": return "오프라인"
            default: return "..."
        }
    }

    weatherFormatter = (param) => {
        switch(param) {
            case "Clear": return "맑음"
            case "Clouds": return "흐림"
            case "Drizzle": return "이슬비"
            case "Rain" : case "Smoke" : case "Haze" : return "비"
            case "Thunderstrom": return "뇌우"
            case "Snow": return "눈"
            case "Mist": return "안개"
            default: return null
        }    
    }
    
    render(){
        return(
            <React.Fragment>
                <Box
                    sx={{
                        height: 30,
                        paddingTop: 0.2,
                        backgroundColor: '#f3f6f9',
                        margin: 1,
                        marginButtom: 1
                    }}
                >
                    <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />} sx={{paddingLeft: 2}} >
                        <Typography color="text.primary">모니터링</Typography>
                        <Typography color="text.primary">실시간 공간-장치 모니터링</Typography>
                    </Breadcrumbs>
                </Box>


                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="10vh"
                    sx={{
                        marginTop: 2
                    }}
                >
                    <Card sx={{ width: '95%', minHeight: 800 }}>
                        <Box sx={{ '& .MuiTextField-root': { m: 0 }, padding: 2 }}>
                            <Grid item xs={12} container spacing={1}>
                                <Grid item xs={2} >
                                    <Typography sx={{textAlign:'left', paddingLeft:1, fontSize:20, fontWeight:'bold'}}>물놀이장 리스트</Typography>
                                    <div className="ag-theme-material" style={{height: 730, padding:'2px' }}>
                                        <AgGridReact
                                            rowHeight="35px" 
                                            rowData={this.state.monitoringList}
                                            headerHeight={0}
                                            onGridReady={this.onSpaceGridReady.bind(this)}
                                            rowSelection={'single'}
                                            onSelectionChanged={this.selectedSpaceChanged.bind(this)}
                                            suppressDragLeaveHidesColumns={true}
                                        >
                                            <AgGridColumn
                                                headerName="상황" 
                                                width={30}
                                                cellStyle={{textAlign:"left",padding: 0}}
                                                cellRenderer= {function(data){
                                                    let bcolor=data.data.errorOccurred=='false'? '#f74747' : '#3caeff';
                                                    return '<div style="width:100%;height:100%;text-align:center;">'+
                                                                '<button style="width:70%;height:95%;text-align:center;border-radius: 5px;border: 0px solid;background-color:'+bcolor+';color: white;font-weight: bold; font-size: 15px;" ></button>'+                                                            
                                                            '</div>';
                                                }}
                                                field="status"
                                            ></AgGridColumn>
                                            <AgGridColumn 
                                                headerName="물놀이장명" 
                                                width={205}
                                                cellStyle={{fontSize:"17px"}}
                                                field="spaceName"
                                            ></AgGridColumn>
                                            
                                        </AgGridReact>
                                    </div>    
                                </Grid>
                                {/* <Divider orientation="vertical" variant="middle" flexItem ></Divider> */}
                                <Grid item xs={10} sx={{ borderLeft:'1px solid #e0e0e0'}}>
                                    <Stack  direction="rows" sx={{ textAlign:'left'}}>
                                        <Typography sx={{textAlign:'left',fontSize:20, fontWeight:'bold',marginBottom:0.3, paddingLeft:3}}>구역 및 장치 리스트</Typography>
                                        <FormControl sx={{ width: 250, marginLeft: 3 ,top:-4}}>
                                            <FormControlLabel 
                                                // sx={{display:'none'}}
                                                control={
                                                    <Switch
                                                        checked={this.state.checked}
                                                        onChange={this.handleSwitchChange}
                                                        //inputProps={{ 'aria-label': 'controlled' }}
                                                        />
                                                    } 
                                                    label="5분 재조회" />
                                        </FormControl>
                                    </Stack>
                                    <Divider flexItem ></Divider>
                                    <Grid item xs={12} container spacing={1} sx={{paddingTop:2, paddingRight:2}}>
                                        <Grid item xs={5}>
                                            <Grid item xs={12} container spacing={1} sx={{paddingTop:1}} >
                                                <Grid item xs={3} >
                                                    <Typography sx={{ textAlign:'right', padding:1 ,paddingRight:3}}>구역 명</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <TextField size="small" 
                                                        inputProps={{style:{paddingTop:10 , backgroundColor:"#f9f9f9"}}}
                                                        InputLabelProps={{ shrink: true }}
                                                        value={this.state.selectedSpace.spaceName} variant="outlined" fullWidth /> 
                                                </Grid>
                                                <Grid item xs={3} >
                                                    <Typography sx={{ textAlign:'right', padding:1 ,paddingRight:3}}>장치 명</Typography>
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <TextField size="small" 
                                                        inputProps={{style:{paddingTop:10 , backgroundColor:"#f9f9f9"}}}
                                                        value={this.state.selectedSpace.nodeName} 
                                                        variant="outlined" fullWidth /> 
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={7}  spacing={1} container>
                                            <Grid item xs={4} >
                                                <Paper elevation={2}  sx={{margin:0.5, position:'relative'}}>
                                                    <Typography color="text.primary" sx={{textAlign:"center" , fontSize:18, paddingTop:1}}>날씨</Typography> 
                                                    <Typography color="text.primary" sx={{textAlign:'center', fontSize:1, height:60}}>
                                                        <WeatherIconComponent weather={this.state.selectedSpace.weather}></WeatherIconComponent>
                                                    </Typography>
                                                    <Typography color="text.primary" sx={{textAlign:'center',paddingBottom:1, fontSize:12, height:27}}>{this.weatherFormatter(this.state.selectedSpace.weather)}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={4}  >
                                                <Paper elevation={2}  sx={{margin:0.5, position:'relative'}}>
                                                    <Typography color="text.primary" sx={{textAlign:"center", fontSize:18, paddingTop:1}}>기온</Typography> 
                                                    <Typography color="text.primary" sx={{textAlign:'center', fontSize:36, padding:1, height:87}}>{this.state.selectedSpace.temperature}</Typography>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={4} >
                                                <Paper elevation={2}  sx={{margin:0.5, position:'relative'}}>
                                                    <Typography color="text.primary" sx={{textAlign:"center", fontSize:18, paddingTop:1}}>대기질</Typography> 
                                                    <Typography color="text.primary" sx={{textAlign:'center', fontSize:36, padding:1, height:87}}>{this.airQualityFormatter(this.state.selectedSpace.airQuality)}</Typography>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="ag-theme-material" style={{height: 570, margin: 10,marginRight:20}}>
                                            <AgGridReact 
                                                rowHeight="35px" 
                                                rowData={this.state.monitoringNodeList}
                                                headerHeight={42}
                                                onGridReady={this.onaAreaGridReady.bind(this)} 
                                                rowSelection={'single'}
                                                suppressDragLeaveHidesColumns={true}
                                                onSelectionChanged={this.selectedNodeChanged.bind(this)}
                                            >
                                                <AgGridColumn headerName="장치명" width={250}
                                                    cellStyle={{fontSize:"17px"}}
                                                    field="nodeName"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="탁도(NTU)" width={130}
                                                    cellStyle={{fontSize:"17px", textAlign:'right'}}
                                                    field="turbidityProbe"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="pH(pH)" width={130}
                                                    cellStyle={{fontSize:"17px", textAlign:'right'}}
                                                    field="phProbe"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="DO(ppm)" width={130}
                                                    cellStyle={{fontSize:"17px", textAlign:'right'}}
                                                    field="doProbe"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="전력값(kw)" width={130}
                                                    cellStyle={{fontSize:"17px", textAlign:'right'}}
                                                    field="powerConsumption"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="비저항(ρ)" width={130}
                                                    cellStyle={{fontSize:"17px", textAlign:'right'}}
                                                    field="ecProbe"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="운전시간" width={155}
                                                    cellStyle={{fontSize:"17px", textAlign:'center'}}
                                                    field="operatingTime"
                                                ></AgGridColumn>
                                                <AgGridColumn headerName="시스템 상태" width={155}
                                                    cellStyle={{fontSize:"17px", textAlign:'center'}}
                                                    field="operatingStatus"
                                                    valueFormatter = {this.operatingStatusFormatter}
                                                ></AgGridColumn>
                                                
                                            </AgGridReact>
                                        </div>    
                                    </Grid>
                                </Grid>
                            </Grid>                       
                        </Box>  
                    </Card>
                </Box>
            </React.Fragment>
            
        );
    }
}

export default DeviceDashboard;