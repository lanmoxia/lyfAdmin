<template>
  <div class="wrapper">
     
     <el-row :gutter="15">
  
        <el-col :span="17">
          <div class="banner">
            <div class="contentArea">
              <div class="welcomeMessage">
                <div class="title"><span> Welcome back</span> 👋</div>
              <div class="nickName"><span>admin@gmail.com</span></div>
              </div>
              <div class="articleInfo">
                <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything.</p>
              </div>
              <div class="goNow">
                <el-button color="#00a76f" style="color: #00140d;">Go now</el-button>
              </div>
            </div>
            
            <div class="welcomePicture">
              
              <img src="../../assets/10.png" class="img-responsive" />
            </div>       
          </div>
        </el-col>
  
        <el-col :span="7">
          <div class="progressWrapper">
            <div class="container">
              <div class="progress">
                <el-progress :stroke-width="4" type="circle":width="70" :height="70" color="#62cc9e" :percentage="48" />
                <div class="numbs">
                  <h2>38,1566</h2>
                  <span>Conversion</span>
                </div>
              </div>       
              <svg-icon class="svgIcon" icon="kefu" size="70"/>
            </div> 
            <div class="container">
              <div class="progress">
                <el-progress :stroke-width="4" type="circle":width="70" :height="70" color="#7af8ff" :percentage="75" />
                <div class="numbs">
                  <h2>38,1566</h2>
                  <span>Conversion</span>
                </div>
              </div>       
              <svg-icon class="svgIcon" size="70" icon="doc" />
            </div> 
          </div>
              
        </el-col>
  
      </el-row>
  
      <el-row :gutter="15">
        <el-col :span="8"><line-echat uniqueId="line1" /></el-col>
        <el-col :span="8"><line-echat uniqueId="line2" iconName="down" iconColor="#ff5731"/></el-col>
        <el-col :span="8"><line-echat uniqueId="line3"  /></el-col>
      </el-row>
  
      <el-row :gutter="15">
      <el-col :span="8">
        <div class="pieEchat">        
          <pie-echat />
        </div>    
      </el-col>
      <el-col :span="16">
        <double-line-echat class="doubleLineEchat" />
      </el-col>
      </el-row>
    </div>
  </template>
  
  <script setup>
  import LineEchat from './components/LineEchat'
  import PieEchat from './components/PieEchat'
  import doubleLineEchat from './components/DoubleLineEchat'
  </script>
  
  <style lang="scss" scoped>
  .wrapper { 
    .banner {
      padding: 30px 60px;
      background: linear-gradient(135deg, rgba(0, 167, 111, 0.2),rgba(29, 179, 124, 0.2)) rgb(255, 255, 255);
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
  
      .welcomePicture {
        display: flex;
        max-width: 280px;
        height: auto;
        position: relative;
        right: 0;
        bottom: -48px;
        >img {
          width: 100%;
          height: 100%;
        }
      }
   
      .contentArea{
        color: #009664;
        .welcomeMessage{
          .title {
            font-size: 26px;
            font-weight: bold;
            margin-bottom: 5px;
          }
        }
        .nickName {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .articleInfo {
          font-size: 12px;
          margin-bottom: 20px;
        }
      }
    }
    .progressWrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .container {
        background-color: #008059;
        border-radius: 16px;
        padding: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .progress {
          display: flex;
          align-items: center;
          &:deep(.el-progress-circle__track){
            stroke: darken(#008059, 2%) !important;
            
          }
          :deep(.el-progress__text){
              color: #f2f9f7 !important;
              font-size: 17px !important;
            }
          .numbs { 
            padding-left: 10px; 
            color: white; 
            font-size: 17px;
              >span {
                font-size: 14px;
                color: #72b9a3;
              }
            }
          }
        .svgIcon { 
          mix-blend-mode: soft-light;
        }
        &:last-child {
          background-color: rgb(0, 146, 179);
          .progress {
          &:deep(.el-progress-circle__track){
            stroke: darken(#0092b3, 2%) !important;      
          }
          .numbs { 
              >span {
                color: #76c4d6;
              }
            }
          }
        }  
      }
    }
    .pieEchat, 
    .doubleLineEchat {
      padding: 20px 24px;
      border-radius: 16px;
      background-color: rgb(255, 255, 255);
      box-shadow: rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px;
      transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    }
    .pieEchat{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  </style>