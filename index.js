import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import { urlObjectKeys } from 'next/dist/shared/lib/utils';
import React from 'react';
import appConfig from "../config.json";
import {useRouter} from 'next/router';
import {useState,useEffect} from 'react';

function Titulo(props){
  console.log(props)
  const Tag = props.tag || "h1";
  return(
    <>
        <Tag>{props.children}</Tag>

          <style jsx>{` 
          ${Tag}{
            color: ${appConfig.theme.colors.neutrals['000']};
            font-size:24px;
            font-weight:600;
          }
          `}</style>
    </>
  );
}

/*function HomePage() {
    return (
      <div>
        <GlobalStyle/>
       <Titulo tag="h2">welcome back!</Titulo>
       <h2>Discord - Alura Matrix</h2>
      </div>
    )
  }
  
  export default HomePage*/

  export default function PaginaInicial() {
    //const username = 'OnlyLuiz';
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [image, setImage] = React.useState('http://github.com/onlyLuiz.png');
    const [dados, setDados] = useState([])
    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => setDados(data))
    }, [])

    
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage:'url(https://i.pinimg.com/originals/bf/cf/de/bfcfde91fb072c3b6d236146e016c5bc.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit= { function (infoDoEvento){
                          infoDoEvento.preventDefault();
                          console.log('alguém enviou o form');
                          window.location.href='/chat';
                          roteamento.push('/chat');
                        }
                        }
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Welcome Back! <br/>
                        {username}</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>
                       {/* <input
                          type="text"
                          value={username}
                          onChange={function (event){
                            console.log('Usuario digitou', event.target.value)
                            //onde está o valor
                            const valor = event.target.value;
                            //trocar valor da variavel
                            setUsername(valor);
                          }}
                        />*/}
                        <TextField
                         value={username}
                         onChange={function (event){
                           console.log('Usuario digitou', event.target.value)
                           //onde está o valor
                           const valor = event.target.value;
                           //trocar valor da variavel
                           setUsername(valor);
                           if(valor.length >= 2){
                             setImage(`https://github.com/${valor}.png`);
                           }else{
                            setImage('http://github.com/onlyLuiz.png');
                           }
                         }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                          />
                        <Button
                            type='submit'
                            label='Login'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[700],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`${image}`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username} <br/>
                            {dados.location}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
  