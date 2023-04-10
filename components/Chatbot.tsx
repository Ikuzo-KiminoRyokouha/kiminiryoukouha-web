import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import Chatgpt from './chatgpt';




export default function Chatbot(){

    const steps = [
        {
          id: 'hello',
          message: '안녕하세요.무엇을도와드릴까요?',
          trigger: 'help',
        },
        {
          id: 'help',
          options: [
            {
              value: 'matzip',
              label: '현재위치 기반 맛집추천',
              trigger: 'order',
            },
            {
              value: 'delivery',
              label: '오늘의날씨 ',
              trigger: 'delivery',
            },
            {
              value: 'return',
              label: '계획 수정하기',
              trigger: 'return',
            },
          ],
        },
        {
          id: 'order',
          component: <Chatgpt/>,
          end:true,
        },
        {
          id: 'delivery',
          message: '오늘의 날씨 입니다.',
          end:true ,
        },
        {
          id: 'return',
          message: '계획 수정하기 관련 문의입니다 .',
          end: true,
        },
      ];



      const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#81DAF5',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#848484',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
      };



    return(<>

    
  
<ThemeProvider theme={theme}>
            <ChatBot steps={steps} />
    </ThemeProvider>
  
 
    
 
    </>)
}



