import api from '../api';

export default class ResourceModel {
  resourceUrl = '';
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async addBid(itemId, userId, bid) {
    console.log('item', itemId, 'user', userId, 'bid', bid);
    const result = await api.post(
      `${this.resourceUrl}/${itemId}/addBid`,
      bid
    );
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async getAll(url = this.resourceUrl) {
    const result = await api.get(url);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return [];
  }

  async getById(id) {
    const result = await api.get(`${this.resourceUrl}/${id}`);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async update(resource) {
    const result = await api.put(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async create(resource) {
    const result = await api.post(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async remove(id) {
    const result = await api.delete(this.resourceUrl, { data: { id } });
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
}