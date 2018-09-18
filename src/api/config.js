/**
 * Created by Cray on 2017/1/5.
 */
export const API_HOST = (process.env.NODE_ENV === 'production')
    ? 'https://api.hefantv.com'
    : (process.env.NODE_ENV === 'preproduction'
        ? 'https://api.adposter.cn'
        : (process.env.NODE_ENV === 'testing'
            ? 'https://testerapi.hefantv.com'
            : (process.env.NODE_ENV === 'testing2'
                ? 'https://tester2api.hefantv.com'
                // : '//tester2api.hefantv.com')))
                : 'https://devapi.hefantv.com')))

export const PAY_HOST = (process.env.NODE_ENV === 'production')
    ? 'https://pay.hefantv.com'
    : (process.env.NODE_ENV === 'preproduction'
        ? 'https://pay.adposter.cn'
        : (process.env.NODE_ENV === 'testing'
            ? 'https://testerpay.hefantv.com'
            : (process.env.NODE_ENV === 'testing2'
                ? 'https://tester2pay.hefantv.com'
                // : '//tester2api.hefantv.com')))
                : 'https://devpay.hefantv.com')))

export const PASSPORT_HOST = (process.env.NODE_ENV === 'production')
    ? 'https://passport.hefantv.com'
    : (process.env.NODE_ENV === 'preproduction'
        ? 'https://api.adposter.cn'
        : (process.env.NODE_ENV === 'testing'
            ? 'https://testerapi.hefantv.com'
            : (process.env.NODE_ENV === 'testing2'
                ? 'https://tester2api.hefantv.com'
                : 'https://devapi.hefantv.com')))


export const CLUBAPI_HOST = (process.env.NODE_ENV === 'production')
    ? 'https://clubapi.hefantv.com'
    : (process.env.NODE_ENV === 'preproduction'
        ? 'https://clubapi.adposter.cn'
        : (process.env.NODE_ENV === 'testing'
            ? 'https://testerclubapi.hefantv.com'
            : (process.env.NODE_ENV === 'testing2'
                ? 'https://tester2clubapi.hefantv.com'
                // : 'https://devclubapi.hefantv.com')))
                : 'https://clubapi.hefantv.com')))



export const H5_HTML_LINK = (process.env.NODE_ENV === 'production') ?
    '//club.hefantv.com/H5' :
    (process.env.NODE_ENV === 'preproduction' ?
        '//club.adposter.cn/H5' :
        (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'testing2' ?
            '//testerh5.hefantv.com/club/H5' :
          //  'https://devclub.hefantv.com/H5'));
            '//testerh5.hefantv.com/club/H5'));

export const HTML_LINK = (process.env.NODE_ENV === 'production') ?
    '//www.hefantv.com' :
    (process.env.NODE_ENV === 'preproduction' ?
        '//www.adposter.cn' :
        (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'testing2' ?
            '//testwww.hefantv.com' :
            (document.domain.indexOf('localhost')>-1?"//"+window.location.host:'//devwww.hefantv.com')
              ));


// 盒饭LIVE pc 官网接口
export const CENTERAPI_HOST = (process.env.NODE_ENV === 'production')
    ? 'https://apicenter.hefantv.com'
    : (process.env.NODE_ENV === 'preproduction'
        ? 'https://apicenter.adposter.cn'
        : (process.env.NODE_ENV === 'testing'
            ? 'https://testerapicenter.hefantv.com'
            : 'https://devapicenter.hefantv.com'))
            //: 'https://testerapicenter.hefantv.com'))
