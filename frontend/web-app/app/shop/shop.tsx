import React from 'react'

const baseUrl = 'http://localhost:5000/api/';

async function getData(){
    const res = await fetch(baseUrl + 'products');

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}

export default async function products() {
    const data = await getData();

    
  return (
    <div>{JSON.stringify(data, null, 2)}</div>
  )
}
