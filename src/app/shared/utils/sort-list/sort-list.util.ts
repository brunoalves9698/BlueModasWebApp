export class SortListUtil {

  public static sort(list: any, field = null, order = 'asc'): any {
    if (order.toLowerCase() == 'asc') {
      list.sort(function (a, b) {
        if (field) {
          if (typeof (a[field]) == 'string' && typeof (b[field]) == 'string')
            return a[field].toLowerCase() < b[field].toLowerCase() ? -1 : a[field].toLowerCase() > b[field].toLowerCase() ? 1 : 0;
          else
            return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
        }
        else {
          return a < b ? -1 : a > b ? 1 : 0;
        }
      });
    } else if (order.toLowerCase() == 'desc') {
      list.sort(function (a, b) {
        if (field) {
          if (typeof (a[field]) == 'string' && typeof (b[field]) == 'string')
            return a[field].toLowerCase() > b[field].toLowerCase() ? -1 : a[field].toLowerCase() < b[field].toLowerCase() ? 1 : 0;
          else
            return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
        }
        else {
          return a > b ? -1 : a < b ? 1 : 0;
        }
      });
    }

    return list;
  }

}
