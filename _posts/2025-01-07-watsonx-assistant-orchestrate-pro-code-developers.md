---
id: nh-102
title: 'Building Skills for watsonx Assistant via Code'
date: 2025-01-07 01:05:00 +0100
author: 'Niklas Heidloff'
layout: post
guid: 'heidloff.net/nh-102'
permalink: /article/watsonx-assistant-orchestrate-pro-code-developers/
custom_permalink:
    - article/watsonx-assistant-orchestrate-pro-code-developers/
image: /assets/img/2025/01/conversational-skills-3.png
---

*Watsonx Assistant and watsonx Orchestrate are great tools for low-code and no-code developers to build conversational experiences. Additionally, they provide extensibility options for pro-code developers for more flexibility and to run custom business logic.*

Watsonx Assistant and watsonx Orchestrate share the same functionality to build conversational experiences. Both can be utilized to build assistants, bots and other natural language-based experiences. There are different options to build these applications.

*1. watsonx Assistant User Interface*

In many cases, coding is not required so that no-code and low-code users can build their own experiences declaratively.

*2. Custom Applications with watsonx Assistant as Backend Service* 

Furthermore, custom applications can be developed which integrate watsonx Assistant via APIs. This requires development, deployment and operation skills to run these types of applications.

*3. watsonx Assistant User Interface plus Extensions*

Recently a new feature has been added, called `Conversational Skills`. In this case watsonx Assistant runs custom skills as extensions, similarly to how it is done for integrations of custom search providers. Watsonx Assistant invokes these extensions, rather than being invoked by applications via API. 

Conversational Skills can be implemented in various languages. They only need to provide certain REST endpoints (SPI - Service Provider Interface). There is an SDK for Java and another one for JavaScript. The endpoints can be deployed, for example, on IBM Code Engine.

## Scenario

Let's look at an example. BluePoints is an application to award colleagues. Employees get certain amounts of blue points each year which they give away to colleagues. In a conversational application they might want to enter the following texts.

* I would like to send BluePoints.
* I would like to send BluePoints to Peter Miller.
* I would like to send 50 BluePoints to Peter Miller.
* I would like to send 50 BluePoints to Peter Miller with comment "Great job!".

In the last example text all information is provided; in the other cases the Assistant needs to ask for missing information. This process is often referred to as `Information Gathering` and `Slot Filling`.

Once all slots are filled, a confirmation can be requested before business logic is executed.

The following screenshots show the conversation flow where every slot is filled sequentially.

![image](/assets/img/2025/01/conversational-skills-5.png)

![image](/assets/img/2025/01/conversational-skills-6.png)

As a more natural way users can provide all information in one step. See also the screenshot at the top of this article.

![image](/assets/img/2025/01/conversational-skills-4.png)

Read the documentation [Gathering information with slots](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-dialog-slots) for details.

## Conversational Skills

With the new feature Conversational Skills, skills can be implemented via code by implementing certain [IBM watsonx Assistant Toolkit Endpoints](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-endpoints.md).

The slots are defined via code. watsonx Assistant uses the slot names, descriptions and names to automatically fill the slots with information from the user input. As you would expect Assistant leverages a Large Language Model from the Granite series to do this.

Via the Java SDK [conversational skills](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-skill-springboot-example/src/main/java/com/example/bluepoints/BluePointsSkill.java) can be implemented as a subclass of the com.ibm.watson.conversationalskills.sdk.Skill class:

```java
public class BluePointsSkill extends Skill {
    private AmountSlotHandler amountSlotHandler = new AmountSlotHandler();
    private ReceiverCommentSlotHandler receiverCommentSlotHandler = new ReceiverCommentSlotHandler();
    private RecipientSelectorSlotHandler recipientSelectorSlotHandler = new RecipientSelectorSlotHandler();
    private RecipientSlotHandler recipientSlotHandler = new RecipientSlotHandler();
    ...
    public SlotHandler[] getSlotHandlers() {
        return new SlotHandler[] {
                this.recipientSlotHandler, this.recipientSelectorSlotHandler, this.amountSlotHandler,
                this.receiverCommentSlotHandler
        };
    }
```

For each slot a [qualifier](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-skill-springboot-example/src/main/java/com/example/bluepoints/qualifiers/Amount.java) is defined.

```java
@Qualifier
@Retention(RUNTIME)
@Target({
	METHOD, FIELD, PARAMETER, TYPE
})
public @interface Amount {
}
```

Each [slot](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-skill-springboot-example/src/main/java/com/example/bluepoints/slot_handlers/AmountSlotHandler.java) must be implemented as a subclass of com.ibm.conversationalskills.sdk.SlotHandler:

```java
@Amount
public class AmountSlotHandler extends SlotHandler {
	private static String SLOT_NAME = "amount";
	public AmountSlotHandler() {
		super(new SlotInFlight().name(SLOT_NAME).type(SlotInFlight.TypeEnum.NUMBER));
	}
	@Override
	public boolean isShownByDefault() {
		return true;
	}
	@Override
	public void onFill(State state) {
		state.getLocalVariables().put("amount", getNormalizedValue());
	}
	@Override
	public void onRepair(State state) {
		onFill(state);
	}
}
```

Skills need to provide an ['orchestrate'](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-skill-springboot-example/src/main/java/com/example/ApplicationExample.java) endpoint.

```java
import com.ibm.watson.conversationalskills.sdk.Skill;
import com.ibm.watson.conversationalskills.sdk.SkillOrchestrator;
...
@RequestMapping(
    method = RequestMethod.POST,
    value = "/providers/{provider_id}/conversational_skills/{conversational_skill_id}/orchestrate",
    produces = { "application/json" },
    consumes = { "application/json" }
)
ResponseEntity<OrchestrationResponse> orchestrate(
        @PathVariable("provider_id") String providerId,
        @PathVariable("conversational_skill_id") String conversationalSkillId,
        @Valid @RequestBody(required = false) OrchestrationRequest orchestrationRequest
) throws Exception {
    Skill[] skills = {new BluePointsSkill()};
    ...
    var skillOrchestrator = new SkillOrchestrator();
    var orchestrationResponse = skillOrchestrator.orchestrate(skillWithID, orchestrationRequest);
    return new ResponseEntity<>(orchestrationResponse, HttpStatus.OK);
}
```

After all slots have been filled, [confirmation messages](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-skill-springboot-example/src/main/java/com/example/bluepoints/BluePointsSkill.java) can optionally be required. After this business logic can be run.

```java
@Override
public ConversationalResponseGeneric onConfirmed(ResourceBundle resourceBundle, State state) {
    var conversationalResponseGeneric = new ConversationalResponseGeneric();
    conversationalResponseGeneric.setResponseType("text");
    conversationalResponseGeneric.setText(getConfirmationStringSubstitutor(state).replace(resourceBundle.getString("confirmation")));
    // your business code goes here
    return conversationalResponseGeneric;
}
```

## Setup

The custom skills need to be deployed somewhere so that Assistant can access them. IBM Code Engine is a good deployment option.

```bash
podman build -f src/main/docker/Dockerfile.jvm --platform linux/amd64 -t quarkus/bluepoints-conversational-skill-provider-jvm:2 .
podman run -i --rm -p 8080:8080 localhost/bluepoints-conversational-skill-provider-jvm:2
curl -X GET localhost:8080/providers/:provider_id/conversational_skills

ibmcloud plugin install container-registry
ibmcloud plugin install ce
ibmcloud login --sso -r eu-de
ibmcloud target -g niklas
ibmcloud cr login 
// create namespace
podman tag localhost/bluepoints-conversational-skill-provider-jvm:2 icr.io/niklas/bluepoints-conversational-skill-provider:2
podman push icr.io/niklas/bluepoints-conversational-skill-provider:2
```

After this the skill needs to be registered.

```bash
curl -X POST 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/xxx/v2/providers?version=2021-11-27' \
-u "apikey:xxx" \
--header 'Content-Type: application/json' \
--data '{
    "provider_id": "niklas-myProCodeProvider",
    "specification": {
        "servers": [
            {
                "url": "https://niklas-conversational-quarkus.xxx.eu-de.codeengine.appdomain.cloud/"
            }
        ],
        "components": {
            "securitySchemes": {
                "authentication_method": "basic",
                "basic": {
                    "username": {
                        "type": "value",
                        "value": "myBasicUserName"
                    }
                }
            }
        }
    },
    "private": {
        "authentication": {
            "basic": {
                "password": {
                    "type": "value",
                    "value": "myBasicPassword"
                }
            }
        }
    }
}'
```

Once registered the Assistant user interface will show the 'Skill-based' option.

![image](/assets/img/2025/01/conversational-skills-1.png)

You will be able to select your custom skill.

![image](/assets/img/2025/01/conversational-skills-2.png)

## Next Steps

Check out the following resources to learn more.

* [Gathering information with slots](https://cloud.ibm.com/docs/watson-assistant?topic=watson-assistant-dialog-slots)
* Documentation: [Create a conversational skill provider](https://cloud.ibm.com/apidocs/assistant-v2#createprovider)
* [IBM watsonx Assistant Toolkit Endpoints](https://github.com/watson-developer-cloud/assistant-toolkit/blob/master/conversational-skills/procode-endpoints.md)
* [IBM watsonx Assistant Toolkit SDK](https://github.com/watson-developer-cloud/assistant-toolkit/tree/master/conversational-skills/procode-skill-sdk-java)
* [IBM watsonx Assistant Toolkit Example](https://github.com/watson-developer-cloud/assistant-toolkit/tree/master/conversational-skills/procode-skill-springboot-example)