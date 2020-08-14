import React from 'react';
import styled from 'styled-components';
import Calendar from './Calendar.jsx';

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  display: inline-block;
  padding-top: 24px;
  padding-bottom: 16px;
  padding-left: 32px;
  padding-right: 32px;
  position: absolute;
  top: 50px;
  right: -10px;
  width: 661px;
  z-index: 1;
  min-height: 460px;
  background: rgb(255, 255, 255);
  border-radius: 16px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 16px;
`;

const TopLeft = styled.div`
  order: 1;
`;

const SelectDate = styled.h2`
  margin: 0px;
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
`;

const MinimumStay = styled.div`
  color: rgb(113, 113, 113);
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  padding-top: 8px;
  max-height: 36px;
  height: 36px;
`;

const TopRight = styled.div`
  flex-basis: 315px;
  order: 2;
  margin-left: 24px;
  min-width: 270px;
  display: flex;
  box-shadow: rgb(176, 176, 176) 0px 0px 0px 1px inset;
  border-radius: 8px;
`;

const CheckIn = styled.div`
  position: relative;
  flex: 1 1 0%;
`;

const CheckOut = styled.div`
  position: relative;
  flex: 1 1 0%;
  border-left: 1px solid rgb(176, 176, 176);
`;

const CheckTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 800;
`;

const AddDate = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 26px;
  padding-bottom: 10px;
  font-size: 14px;
  color: rgb(113, 113, 113);
`;

const Bottom = styled.div`
  display: flex;
  height: 100%;
`;

class CalendarBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <Container>
        <Top>
          <TopLeft>
            <SelectDate>Select dates</SelectDate>
            <MinimumStay>Minimum stay: {this.props.minimum_stay} nights</MinimumStay>
          </TopLeft>
          <TopRight>
            <CheckIn>
              <CheckTitle>CHECK-IN</CheckTitle>
              <AddDate>{this.props.checkInDateMomentObj ? this.props.checkInDateMomentObj.format('L') : 'Add date'}</AddDate>
            </CheckIn>
            <CheckOut>
              <CheckTitle>CHECKOUT</CheckTitle>
              <AddDate>{this.props.checkOutDateMomentObj ? this.props.checkOutDateMomentObj.format('L') : 'Add date'}</AddDate>
            </CheckOut>
          </TopRight>
        </Top>
        <Bottom>
          <Calendar minimum_stay={this.props.minimum_stay} booked_date={this.props.booked_date} getCheckInDate={this.props.getCheckInDate} getCheckOutDate={this.props.getCheckOutDate} close={this.props.close} close={this.props.close} clearDate={this.props.clearDate}/>
        </Bottom>
      </Container>
    );
  }
}

export default CalendarBox;