export default {
    start(){


        (function () {

            if (!window.__hfa) {

                window._faq = window._faq || [];
                window._faq.push(['_setAccount', '_hefantv'], ['_data', 'type=pv']);

                var ma = document.createElement('script');
                ma.type = 'text/javascript';
                ma.async = true;
                ma.src = ('http:' == document.location.protocol ? 'http://ha.hefantv.com' : 'https://ha.hefantv.com') + '/hfa_pc.js';
                // ma.src = 'https://ha.hefantv.com/hfa_wap.js';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(ma, s);

                window.faqPush = function (btn_name, btn_id) {
                    window._faq.push(['_data', 'type=click&q_btn_name=' + btn_name + '&q_btn_id=' + (btn_id?btn_id:btn_name)]);
                    if (window.__hfa) window.__hfa()
                }

                $("body").on('click','.hfa',function(){
                    alert(1222)
                })

            }

        })();
    }
}