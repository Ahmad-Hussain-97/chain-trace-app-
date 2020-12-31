import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Modal } from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon } from 'native-base';
import { TextInput, List } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import GetLocation from 'react-native-get-location';


const HomeScreen = ({ navigation }) => {

  {
    //states for create Domain
  }
  const [dom, setdom] = useState(false);
  const [DNforDomain, setDNforDomain] = useState("");
  const [RNforDomain, setRNforDomain] = useState("");
  {
    //states for create Asset
  }
  const [asset, setasset] = useState(false);
  const [ANforAsset, setANforAsset] = useState("");
  const [DNforAsset, setDNforAsset] = useState("");

  {
    //states for transfer Asset
  }
  const [transferAsset, settransferAsset] = useState(false);
  const [destforTA, setdestforTA] = useState("");
  const [assetIdforTA, setassetIdforTA] = useState("");
  const [amountforTA, setamountforTA] = useState("");

  {
    //states for add asset quantity
  }

  const [assetQuantity, setassetQuantity] = useState(false);
  const [aidforAQ, setaidforAQ] = useState("");
  const [amountforAQ, setamountforAQ] = useState("");

  {
    //states for subtract asset quantity
  }

  const [SassetQuantity, setSassetQuantity] = useState(false)
  const [SaidforAQ, setSaidforAQ] = useState("");
  const [SamountforAQ, setSamountforAQ] = useState("");

  {
    //states for get account asset
  }

  const [getAccountAssetstate, setgetAccountAssetstate] = useState(false);
  const [ASforgetAA, setASforgetAA] = useState("");
  const [ACforgetAA, setACforgetAA] = useState("");

  {
    //States for get asset info
  }
    const [AssetInfo, setAssetInfo] = useState(false);
    const [assetIdforAI, setassetIdforAI] = useState("");

  {
    //states get asset track
  }

  const [getAssetTrack, setgetAssetTrack] = useState(false);
  const [ASforgetTrack, setASforgetTrack] = useState("");
  const [ACforgetTrack, setACforgetTrack] = useState("");


  {
    //states for user feedback
  }

  const [feedback, setfeedback] = useState(false);
  const [feedbackApp, setfeedbackApp] = useState(false);
  const [feedbackAsset, setfeedbackAsset] = useState(false);
  const [feedbackdesc, setfeedbackdesc] = useState("");
  const [feedbackrating, setfeedbackrating] = useState("");
  const level=process.env.ACCOUNT_ACCESS
 console.log(level)

    {
      //states for set access
    }

const [access, setaccess] = useState(false)
const [accountAcess, setaccountAcess] = useState("");
const [accountlevel, setaccountlevel] = useState("");
  
  return (
    <ScrollView>
      <List.AccordionGroup>
        <Text style={{ marginVertical: 2, backgroundColor: '#fff', padding: 12, fontWeight: 'bold' }}>
          Perform operations by selecting your role below:
    </Text>

        {
//Modals for all operations-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
          //MODAL FOR CREATE DOMAIN (success)
        }<ScrollView>
          <Modal transparent={true} visible={dom}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, padding: 30, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginVertical: 5 }}
                  label="Domain Name"
                  onChangeText={(val) => { setDNforDomain({ val }) }}
                />

                <TextInput style={{ marginVertical: 5 }}
                  label="Default Role Name"
                  onChangeText={(val) => { setRNforDomain({ val }) }}
                />

                <Button block success
                  style={{ marginTop: 10, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "createDomain",
                        args: { 'domainha': DNforDomain.val, 'roleha': RNforDomain.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    }).then((response) => {
                      if (response.status == 200) {
                        Alert.alert('Congratulations!', 'Successfully created new Domain.', [{ text: 'Okay' }])
                      }
                    });
                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setdom(false)}
                  style={{ marginTop: 20 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR SET ACCOUNT ACCESS (success)
        }<ScrollView>
          <Modal transparent={true} visible={access}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Account Id"
                  onChangeText={(val) => { setaccountAcess({ val }) }}
                />

                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Access Level"
                  onChangeText={(val) => { setaccountlevel({ val }) }}
                />

                

                <Button block success
                  style={{ marginTop: 5, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "setAccountAccess",
                        args: { 'account_id': accountAcess.val,'access_level':accountlevel.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"
                      }),

                    })
                      .then(res => res.json())
                      .then((res) => {
                      var ans=res.result;
                       Alert.alert("Assets record",ans , [{ text: 'Okay' }])
                      });

                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setaccess(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>


        {
          //MODAL FOR CREATE ASSET (success)
        }<ScrollView>
          <Modal transparent={true} visible={asset}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Asset Name"
                  onChangeText={(val) => { setANforAsset({ val }) }}
                />

                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Domain Name"
                  onChangeText={(val) => { setDNforAsset({ val }) }}
                />


                <Button block success
                  style={{ marginTop: 5, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "createAsset",
                        args: { 'assetname': ANforAsset.val, 'domainname': DNforAsset.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                      
                    })
                    .then((response) => {
                      //Alert.alert(JSON.stringify(response))
                      if (response.status == 200) {
                        Alert.alert('Congratulations!', 'Successfully created the new asset.', [{ text: 'Okay' }])
                      }
                    });
                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setasset(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR GET ACCOUNT ASSET (Variable shuffled) (success)
        }<ScrollView>
          <Modal transparent={true} visible={getAccountAssetstate}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Account Id"
                  onChangeText={(val) => { setASforgetAA({ val }) }}
                />

                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Asset Id"
                  onChangeText={(val) => { setACforgetAA({ val }) }}
                />


                <Button block success
                  style={{ marginTop: 5, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "getAccountAsset",
                        args: { 'asgetaa': ASforgetAA.val, 'acgetaa': ACforgetAA.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    })
                      .then(res => res.json())
                      .then((res) => {
                        var assets = parseOutput(res.msg, [' -Asset Id-']);
                        var prettified = "";
                        for (var i = 0; i < assets.length; i++) {
                          prettified += "Asset: "+assets[i]+".\n"  ;
                        }
                        Alert.alert("Assets record", prettified, [{ text: 'Okay' }])
                      });
//" with " + assets[++i] + " unit(s)\n"
                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setgetAccountAssetstate(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR ADD ASSET QUANTITY (success)
        }
        <ScrollView>
          <Modal transparent={true} visible={assetQuantity}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, padding: 30, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginVertical: 5 }}
                  label="Asset ID <asset>#<domain>"
                  onChangeText={(val) => { setaidforAQ({ val }) }}
                />

                <TextInput style={{ marginVertical: 5 }}
                  label="Quantity [int]"
                  onChangeText={(val) => { setamountforAQ({ val }) }}
                />

                <Button block success
                  style={{ marginTop: 10, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "addAssetQuantity",
                        args: { 'aid': aidforAQ.val, 'quantity': amountforAQ.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    }).then((response) => {
                      if (response.status == 200) {
                        // Alert.alert(JSON.stringify(response))
                        Alert.alert('Congratulations!', 'Asset Quantity is added.', [{ text: 'Okay' }])
                      }
                    });
                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setassetQuantity(false)}
                  style={{ marginTop: 20 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR TRANSFER ASSET (success)
        }<ScrollView>
          <Modal transparent={true} visible={transferAsset}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', marginHorizontal: 50, marginVertical: 70, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
               
                
                <TextInput style={{ marginBottom: 3, height: 50 }}
                  label="Dest Id <account>@<domain>"
                  onChangeText={(val) => { setdestforTA({ val }) }}
                />
                <TextInput style={{ marginBottom: 3, height: 50 }}
                  label="Asset Id <asset>#<domain>"
                  onChangeText={(val) => { setassetIdforTA({ val }) }}
                />


                <Button block success
                  style={{ marginTop: 5, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "transferAsset",
                        args: { 'dest': destforTA.val,  'asseti': assetIdforTA.val,'amo': amountforTA.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    }).then((response) => {
                      //Alert.alert(JSON.stringify(response))
                      // if (response.status == 200) {
                      //   Alert.alert('Congratulations!', 'Successfully transfered the quantity of the specified asset.', [{ text: 'Okay' }])
                      // }
                    });



        //=======================================================
              GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
              const history=  '[' + location.longitude + ',' + location.latitude+ ',' + Math.floor(location.time/1000) + ']'
              fetch('http://10.97.9.35:3000/call/', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fn: "recordHistory",
                args: { 'asset_id': assetIdforTA.val, 'new_details':history},
                tok: "a85c29bf1f3e07f8d2d81027bd20887d"

          }),

        }).then((response) => {
          //Alert.alert(JSON.stringify(response))
          if (response.status == 200) {
            Alert.alert('Congratulations!', 'Successfully updated the asset history.', [{ text: 'Okay' }])
          }
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
        
        });

                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => settransferAsset(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR SUBTRACT ASSET QUANTITY 
        }
        <ScrollView>
          <Modal transparent={true} visible={SassetQuantity}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, padding: 30, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginVertical: 5 }}
                  label="Asset ID <asset>#<domain>"
                  onChangeText={(val) => { setSaidforAQ({ val }) }}
                />

                <TextInput style={{ marginVertical: 5 }}
                  label="Quantity [int]"
                  onChangeText={(val) => { setSamountforAQ({ val }) }}
                />

                <Button block success
                  style={{ marginTop: 10, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "subAssetQuantity",
                        args: { 'subaid': SaidforAQ.val, 'subquantity': SamountforAQ.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    }).then((response) => {
                      if (response.status == 200) {
                        // Alert.alert(JSON.stringify(response))
                        Alert.alert('Congratulations!', 'Asset Quantity is subracted.', [{ text: 'Okay' }])
                      }
                    });
                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setSassetQuantity(false)}
                  style={{ marginTop: 20 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR GET ACCOUNT ASSET TRACK (success)
        }<ScrollView>
          <Modal transparent={true} visible={getAssetTrack}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Account Id"
                  onChangeText={(val) => { setASforgetTrack({ val }) }}
                />

                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Asset Id"
                  onChangeText={(val) => { setACforgetTrack({ val }) }}
                />


                <Button block success
                  style={{ marginTop: 5, backgroundColor: '#172082' }}
                  onPress={() => {
                    
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "getAccountAssetTxs",
                        args: { 'acgettrack': ASforgetTrack.val, 'asgettrack': ACforgetTrack.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"
                      }),

                    })
                      .then(res => res.json())
                      .then((res) => {

                        var assets = parseOutput(res.result, ['dest_account_id: ', 'amount:']);
                        var prettified = "";
                        for (var i = 0; i < assets.length; i++) {
                          prettified += assets[i] + " has recieved " + assets[++i] + "\n" ;
                        }
                        Alert.alert("Account Asset History", prettified, [{ text: 'Okay' }])
                      });

                  }}>
                  <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setgetAssetTrack(false)}
                  style={{ marginTop: 15 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR GET Asset info (success)
        }<ScrollView>
          <Modal transparent={true} visible={AssetInfo}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
                <TextInput style={{ marginBottom: 6, height: 50 }}
                  label="Asset Id"
                  onChangeText={(val) => { setassetIdforAI({ val }) }}
                />

             
                <Button block success
                  style={{ marginTop: 15, backgroundColor: '#172082' }}
                  onPress={() => {
                    fetch('http://10.97.9.35:3000/call/', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        fn: "getAssetInfo",
                        args: { 'assetIAI': assetIdforAI.val },
                        tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                      }),

                    })
                      .then(res => res.json())
                      .then((res) => {

                        var assets = parseOutput(res.result, ['asset_id:', 'domain_id:']);
                        var prettified = "";
                        for (var i = 0; i < assets.length; i++) {
                          prettified += "Asset Id: "+assets[i]  +".\nDomain Name: "+ assets[++i]+".\nPrecision: '0'.\n" ;
                        }
                        Alert.alert("Asset Detail ", prettified, [{ text: 'Okay' }])
                      });

                  }}>

                    
                  <Text>Submit</Text>
                </Button>


                <Button rounded danger
                  onPress={() => setAssetInfo(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR get user feedback (success)
        }<ScrollView>
          <Modal transparent={true} visible={feedback}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginBottom:400, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
              
                <Button block rounded
                style={{marginTop:30, padding:0}}
                onPress={()=>setfeedbackApp(true)} >
                     <Icon name='star-half-outline'/>
                     <Text>rate this Dapp</Text>
                </Button>

                <Button block rounded
                style={{marginTop:20}}
                onPress={()=>setfeedbackAsset(true)}>
                    <Icon name='brush-outline'  />
                     <Text>Asset Feedback</Text>
                </Button>
                <Button rounded danger
                  onPress={() => setfeedback(false)}
                  style={{ marginTop: 50 }}>
                  <Icon name='arrow-back' style={{paddingLeft:0}} />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR get user feedback (App feedback) 
        }<ScrollView>
          <Modal transparent={true} visible={feedbackApp}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginBottom:400, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
               <Rating
                  type='custom'
                  showRating
                  ratingCount={5}
                  onFinishRating={(rate)=> setfeedbackrating(rate) }
                  style={{ paddingVertical: 10 }}
                />
                <Button block rounded
                style={{marginTop:25, marginBottom:5}}
                onPress={() =>{
                  fetch('http://10.97.9.35:3000/call/', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    fn: "getrating",
                    args: { 'feedbackRate': feedbackrating },
                    tok: "a85c29bf1f3e07f8d2d81027bd20887d"}),
                })
                Alert.alert("Congratulations","Thank you for giving feedback about an asset.",[{text:"Okay"}]);

                }} >
                     <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setfeedbackApp(false)}
                  style={{ marginTop: 10 }}>
                  <Icon name='arrow-back' style={{paddingLeft:0}} />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
          //MODAL FOR get user feedback (Asset feedback) (success)
        }<ScrollView>
          <Modal transparent={true} visible={feedbackAsset}>
            <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
              <View style={{ backgroundColor: '#ffffff', margin: 50, marginVertical: 90, paddingHorizontal: 30, paddingVertical: 15, borderRadius: 10, flex: 1 }}>
              
              <TextInput
                  multiline={true}
                  style={{ height: 180, fontSize:18 }}
                  label="Type Asset Feedback"
                  onChangeText={(val) => { setfeedbackdesc({ val }) }}
                />

                <Button block rounded
                style={{marginTop:8, marginBottom:5}}
                onPress={ () => {
                  fetch('http://10.97.9.35:3000/call/', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    fn: "getfeedback",
                    args: { 'feedbackText': feedbackdesc.val },
                    tok: "a85c29bf1f3e07f8d2d81027bd20887d"}),
                })
                Alert.alert("Congratulations","Thank you for giving feedback about an asset.",[{text:"Okay"}]);
                } 

               }>
                     <Text>Submit</Text>
                </Button>

                <Button rounded danger
                  onPress={() => setfeedbackAsset(false)}
                  style={{ marginTop: 5 }}>
                  <Icon name='arrow-back' style={{paddingLeft:0}} />
                  <Text>Back</Text>
                </Button>

              </View>
            </View>
          </Modal>
        </ScrollView>

        {
//HOME SCREEN MAIN FUNCTIONALITY--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        }
        {/* var access = process.env.ACCOUNT_ACCESS
        if (access == 5) {} */}


{level==5 ?(
        <List.Accordion title="Manufacturer" id="1"  >
          <List.Item style={styles.listItem} title="Create Domain" onPress={() => setdom(true)} left={props => <List.Icon {...props} icon="domain" />} />
          <List.Item style={styles.listItem} title="Create Asset" onPress={() => setasset(true)} left={props => <List.Icon {...props} icon="slack" />} />
          <List.Item style={styles.listItem} title="Add Asset Quantity" onPress={() => setassetQuantity(true)} left={props => <List.Icon {...props} icon="cart-plus" />} />
          <List.Item style={styles.listItem} title="Transfer Asset" onPress={() => settransferAsset(true)} left={props => <List.Icon {...props} icon="truck-fast" />} />
          <List.Item style={styles.listItem} title="Get Assets Information" onPress={() => setAssetInfo(true)} left={props => <List.Icon {...props} icon="garage-alert" />} />
          <List.Item style={styles.listItem} title="Get Account Asset" onPress={() => setgetAccountAssetstate(true)} left={props => <List.Icon {...props} icon="account-star" />} />
          <List.Item style={styles.listItem} title="Generate QR Code" onPress={() => navigation.navigate('QrCodeGenerator')} left={props => <List.Icon {...props} icon="qrcode-scan" />} />
        </List.Accordion>
):null}
{level==5 ?(
        <List.Accordion title="Distributor(s)" id="2" >
          <List.Item style={styles.listItem} title="Get Assets Information" onPress={() => setAssetInfo(true)} left={props => <List.Icon {...props} icon="garage-alert" />} />
          <List.Item style={styles.listItem} title="Transfer Asset" onPress={() => settransferAsset(true)} left={props => <List.Icon {...props} icon="truck-fast" />} />
        </List.Accordion>
):null}
{level==5 ?(
        <List.Accordion title="Retailer" id="4">
            <List.Item style={styles.listItem} title="Get Asset Information" onPress={() => setAssetInfo(true)} left={props => <List.Icon {...props} icon="garage-alert" />} />
            <List.Item style={styles.listItem} title="Get Account Asset" onPress={() => setgetAccountAssetstate(true)} left={props => <List.Icon {...props} icon="account-star" />} />
            <List.Item style={styles.listItem} title="Track a Product" onPress={() => setgetAssetTrack(true) } left={props => <List.Icon {...props} icon="go-kart-track" />} />
        </List.Accordion>
 ):null}
{level==5? (
        <List.Accordion title="Manage Account" id="5">
          <List.Item style={styles.listItem} title="Set Account Access" onPress={() => setaccess(true)} left={props => <List.Icon {...props} icon="account-settings" />} />
       </List.Accordion>
    ):(
       <List.Accordion title="Customer" id="3">
          <List.Item style={styles.listItem} title="Track a Product" onPress={() => setgetAssetTrack(true) } left={props => <List.Icon {...props} icon="go-kart-track" />} />
          <List.Item style={styles.listItem} title="Give Feedback" onPress={() => setfeedback(true)} left={props => <List.Icon {...props} icon="comment-quote-outline" />} />
       </List.Accordion>
)}
      </List.AccordionGroup>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 50,
    paddingTop: 60,
  },
  button_style: {
    fontWeight: 'bold',
    padding: 15,
    marginBottom: 40,
  },
  listItem: {
    backgroundColor: '#fff',
  }
});

var parseOutput = (out, delimeters) => {
  var lines = out.split('\n');
  var results = [];
  lines.forEach((line) => {
    delimeters.forEach((delim) => {
      if (line.includes(delim)) {
        results.push(line.split(delim)[1]);
      }
    })
  })
  return results;
}