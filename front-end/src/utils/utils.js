import React, { useState } from 'react';

export function getUrlParams(id) {
    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(id);
    return param;
}

export function isJSON(str) {
    try {
        const parsedValue = JSON.parse(str);
        return typeof parsedValue !== 'object' || (Array.isArray(parsedValue) && parsedValue.length > 0);
    } catch (error) {
        return false;
    }
}

export function calcDiff(data) {
    const date1 = new Date(data).getTime();
    const date2 = new Date().getTime();

    return Math.ceil((date1 - date2) / (1000 * 3600 * 24)) + 0;
}