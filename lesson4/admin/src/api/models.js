import {get, post} from "./http";

export const _get = function(url, data, success, error) {
  get(url, data)
    .then(res => {
      success(res);
    })
    .catch(err => {
      error && error(err);
    });
};

export const _post = function (url, data, success, error) {
  post(url, data).then(res => {
    success(res);
  })
    .catch(err => {
      console.log(error);
      error && error(err);
    });
};

export const userModel =  {
  list: function(data, success, error) {
    _post('admin/users', data, success, error)
  },
  enable: function(data, success, error) {
    _post('admin/user/enable', data, success, error)
  }
}

export const activityModel =  {
  list: function(data, success, error) {
    _post('admin/activities', data, success, error)
  },
  edit: function(data, success, error) {
    _post('admin/activity/edit', data, success, error)
  },
  del: function(data, success, error) {
    _post('admin/activity/del', data, success, error)
  }
}

export const signModel = {
  list: function(data, success, error) {
    _post('admin/sign/list', data, success, error)
  }
}