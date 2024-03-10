import axios from 'axios';
import { react_url } from '..';

export const CustomerService = {
  async getDataFromDatabase() {
    try {
      const response = await axios.get(`${react_url}/userdetails/`);
      if (!response.data) {
        throw new Error('Failed to fetch customer data');
      }
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  async getCustomersSmall() {
    const response = await axios.get(`${react_url}/userdetails/?size=small`);
    return response.data;
  },
  async getCustomersMedium() {
    const response = await axios.get(`${react_url}/userdetails/?size=medium`);
    return response.data;
  },
  async getCustomersLarge() {
    const response = await axios.get(`${react_url}/userdetails/?size=large`);
    return response.data;
  },
  async getCustomersXLarge() {
    const response = await axios.get(`${react_url}/userdetails/?size=xlarge`);
    return response.data;
  },
  async getCustomers() {
    const databaseData = await this.getDataFromDatabase();
    return databaseData;
  },
};
