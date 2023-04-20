import ChatBot from 'react-simple-chatbot';
import styled, { ThemeProvider } from 'styled-components';
import Chatgpt from './chatgpt';
import QWER from 'pages/planput';
import ABC from 'pages/weather';


const CustomComponent = styled.div`
  background-color: #848484;
  color: #fff;
`;


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
              trigger: 'weather',
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
          component: <CustomComponent><Chatgpt/></CustomComponent>,
          end:true,
        },
        {
          id: 'weather',
          component: <CustomComponent><ABC/></CustomComponent>,
          end:true ,
        },
        {
          id: 'return',
          options: [
            {
              value: 'activatedPlans',
              label: '진행중인계획수정',
              trigger: 'activatedPlansCom',
            },
            {
              value: 'waitingPlans',
              label: '다가오는계획수정 ',
              trigger: 'waitingPlans',
            },
           
          ],
          
        },
        {
          id:"activatedPlansCom",
          component: <CustomComponent><QWER/></CustomComponent>,

        },
        {
          id:"waitingPlans",
          component: <CustomComponent><QWER/></CustomComponent>,
        }
                  
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
        customComponentBgColor: '#1000f4',
      };
      



    return(<>

    
<ThemeProvider theme={theme}>
  <ChatBot steps={steps} />
</ThemeProvider>
 
    
 
    </>)
}



