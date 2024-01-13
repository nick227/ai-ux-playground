const api = {
  async create(route, data) {
    const response = await fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async read(route, queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${route}?${queryString}`;
    console.log('url', url);  
    const response = await fetch(url, {
      method: 'GET',
    });
    return await response.json();
  },

  async update(route, data) {
    const response = await fetch(route, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async delete(route, queryParams = {}) {
    const queryString = new URLSearchParams(queryParams).toString();
    const response = await fetch(`${route}?${queryString}`, {
      method: 'DELETE',
    });
    return await response.json();
  },
};
