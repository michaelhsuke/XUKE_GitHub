$( function() {
    var activity_json = {
        count: 3,
        data: [
            {
                id: "3",
                title: "五一出游",
                time: "2015-05-02",
                location: "凤凰岭",
                desc: "人多的季节，要避开这个高峰！",
                count: 10,
                avatars: ["img-01.png", "img-02.png", "img-03.png", "img-06.png", "img-05.png"],
                joined: 1
            },
            
            {
                id: "2",
                title: "第二次活动",
                time: "2015-04-26",
                location: "慕田峪长城",
                desc: "不到长城非好汉，不吃烤鸭真遗憾",
                count: 6,
                avatars: ["img-03.png", "img-01.png", "img-04.png", "img-05.png", "img-02.png"],
                joined: 0
            },

            {
                id: "1",
                title: "第一次活动",
                time: "2015-04-20",
                location: "北京植物园",
                desc: "春天到来，快到北京植物园玩吧",
                count: 5,
                avatars: ["img-03.png", "img-01.png", "img-02.png", "img-04.png", "img-05.png"],
                joined: 1
            }
        ]
    };

    // 创建参与活动的人员信息
    function makeActivityJoinInfo( data ) {
        if (data == "" || $.isEmptyObject(data))
            return;

        var memeberCountWrapper = document.createElement("div");
        memeberCountWrapper.className = "memeber-count row";

        var pMemeber = document.createElement("p");
        var memberMsg = "";
        if (parseInt(data.count) <= 0) {
            pMemeber.className = "col-xs-12 col-sm-12 col-md-12";
            memberMsg = "尚无人报名参加";
        }
        else {
            pMemeber.className = "col-xs-12 col-sm-12 col-md-12 glyphicon glyphicon-ok";
            memberMsg = "共有<span class='count' for='activity-" + data.id + "'>" + data.count + "人参加</span>";
        }

        pMemeber.innerHTML = memberMsg;
        memeberCountWrapper.appendChild(pMemeber);

        return memeberCountWrapper;
    }

    // 创建参加活动人员的头像列表
    function makeMemeberAvatars( avatars ) {
        if (avatars == "")
            return null;
        
        var memeberAvatars = document.createElement("div");
        memeberAvatars.className = "memeber-avatars row";

        var pAvatars = document.createElement("p");
        pAvatars.className = "col-xs-12 col-sm-12 col-md-12 text-right";
        memeberAvatars.appendChild(pAvatars);

        for (var i in avatars)
        {
            var imgSrc = "images/" + avatars[i];
            var avatarSpan = document.createElement("span");
            avatarSpan.className = "avatar-span";
            avatarSpan.innerHTML = "<a href='#'><img src='" + imgSrc + "' width='32px' height='32px' class='img-circle'/></a>";
            pAvatars.appendChild(avatarSpan);
        }

        return memeberAvatars;
    }


    // 创建每个活动的主要内容
    function makeActivityItemMain( data ) {
        if ( data == "" || $.isEmptyObject(data) )
            return null;

        // 创建行
        var activityItemMain = document.createElement("div");
        activityItemMain.className = "activity-item-main row";

        var activityContent = document.createElement("div");
        activityContent.className = "col-xs-12 col-sm-12 col-md-12";
        activityItemMain.appendChild(activityContent);

        var leftContent = document.createElement("div");
        leftContent.className = "pull-left";
        activityContent.appendChild(leftContent);

        if (data.title !== "" || !data.title.isEmpty()) {
            var h3 = document.createElement("h3");
            h3.innerHTML = data.title;
            leftContent.appendChild(h3);
        }

        if (data.time !== "" || !data.time.isEmpty()) {
            var timeSpan = document.createElement("span");
            timeSpan.className = "time";
            timeSpan.innerHTML = data.time;
            leftContent.appendChild(timeSpan);
        }

        if (data.location != "") {
            var locationSpan = document.createElement("span");
            locationSpan.className = "location";
            locationSpan.innerHTML = data.location;
            leftContent.appendChild(locationSpan);
        }

        leftContent.appendChild(document.createElement("p"));

        var pDesc = document.createElement("p");
        pDesc.innerHTML = data.desc;
        leftContent.appendChild(pDesc);

        var rightContent = document.createElement("div");
        rightContent.className = "pull-right";
        activityContent.appendChild(rightContent);

        rightContent.appendChild(document.createElement("br"));

        var joinButton = document.createElement("a");
        
        joinButton.href = "#";
        joinButton.setAttribute("role", "button");
        joinButton.setAttribute("for", data.id);
        if (parseInt(data.joined) == 1) {
            joinButton.setAttribute("disabled", "disabled");
            joinButton.className = "btn btn-default glyphicon glyphicon-user pull-right btn-join btn-disable";
            joinButton.innerHTML = "已报名";
        } else {
            joinButton.className = "btn btn-default glyphicon glyphicon-user pull-right btn-join";
            joinButton.innerHTML = "报名";
        }
        
        rightContent.appendChild(joinButton);

        return activityItemMain;
    }

    // 创建每个活动的框架
    function makeActivityItem( data ) {
        if ( data == "" || $.isEmptyObject(data) )
            return;

        var activityItem = document.createElement("li");
        activityItem.className = "activity-item list-group-item";

        // 创建容器
        var activityContainer = document.createElement("div");
        activityContainer.className = "activity-container";
        activityItem.appendChild(activityContainer);

        // 创建活动描述信息及报名入口
        var activityItemMain = makeActivityItemMain(data);
        if (activityItemMain !== null) {
            activityContainer.appendChild(activityItemMain);
            activityContainer.appendChild(document.createElement("hr"));
        }


        // 显示活动参与信息
        var activityJoinInfo = makeActivityJoinInfo(data);
        if (activityJoinInfo !== null) {
            activityContainer.appendChild(activityJoinInfo);
            activityContainer.appendChild(document.createElement("hr"));
        }

        var memeberAvatars = makeMemeberAvatars(data.avatars);
        if (memeberAvatars !== null)
            activityContainer.appendChild(memeberAvatars);

        return activityItem;
    }

    // 创建所有活动列表
    function makeActivityList( json )
    {
        if ($.isEmptyObject(json))
            return null;

        var count = json.count;
        if (parseInt(count) == 0)
            return null;

        var activityList = document.createElement("ul");
        activityList.className = "activity-list list-group";

        for(var i = 0; i < count; i++)
        {
            var activityItem = makeActivityItem(json.data[i]);
            activityList.appendChild(activityItem);
        }
        return activityList;
    }

    // 执行更行列表
    $("#wrapper").html(makeActivityList(activity_json))
        .addClass("container-fluid");
    $("a.btn-join").click(function() {
        var id = $(this).attr("for");
        var msg = "你要参加的活动编号为" + id + "!";
        alert(msg);
        $(this).blur();
    });
} );