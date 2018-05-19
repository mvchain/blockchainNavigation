import request from '@/utils/request';
export function projectList(data) {
  return request({
    url: '/admin/keyName?keyName=' + data,
    method: 'get'
  });
};
